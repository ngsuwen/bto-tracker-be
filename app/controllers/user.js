const db = require("../models/index");
const bcrypt = require("bcrypt");
const User = db.user;
const Project = db.projects; // projects table
const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({apiKey: process.env.API_KEY, domain: DOMAIN});

// Create user
exports.create = async (req, res) => {
  const project = await Project.findOne({
    where: {
      launch: req.body.launch,
    },
  });

  const user = {
    username: req.body.username ? req.body.username : null,
    password: req.body.password
      ? bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
      : null,
    role: req.body.role,
    email: req.body.email,
    validation: req.body.validation,
    msg: req.body.message,
    projectId: project.id,
    fk_launch: project.launch,
  };

  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all users
exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Retrieve user
exports.findOne = (req, res) => {
  let username = req.params.username;

  User.findAll({
    where: {
      username: username,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find user with username=${username}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with username=" + username,
      });
    });
};

// Update user password
exports.update = async (req, res) => {
  let id = req.body.id;
  let oldPassword = req.body.oldPassword;
  let newPassword = bcrypt.hashSync(
    req.body.newPassword,
    bcrypt.genSaltSync(10)
  );

  const userToUpdate = await User.findOne({
    where: {
      id: id,
    },
  });

  if (bcrypt.compareSync(oldPassword, userToUpdate.password)) {
    User.update(
      { password: newPassword },
      {
        where: {
          id: id,
        },
      }
    )
      .then((num) => {
        if (num == 1) {
          res.send({
            status: "User was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update User with username=${username}. Maybe User was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating User with username=" + username,
        });
      });
  } else {
    res.status(500).send({
      message: "Wrong password",
    });
  }
};

// Update user settings (admin side)
exports.updateAdmin = async(req, res) => {
  const userToUpdate = await User.findOne({
    where: {
      id: req.body.id,
    },
  });
  User.update(
    {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then((num) => {
      if (num == 1) {
        let email = {
          from: 'BtoTracker <bto.tracker.website@gmail.com>',
          to: userToUpdate.email,
          subject: 'Registeration Successful',
          html: `
          <p>Thank you for your interest.</p>
          <p>Please use the following account details for your login. You are strongly recommended to update your password after your first login.</p>
          <b>username:</b> ${req.body.username}<br/>
          <b>password:</b> ${req.body.password}<br/>`
        };
        mg.messages().send(email);
        Project.update(
          {
            [userToUpdate.role]: true,
          },
          {
            where: {
              launch: userToUpdate.fk_launch,
            },
          }
        )
        res.send({
          status: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${req.body.id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + req.body.id,
      });
    });
};

// Delete user
exports.delete = async (req, res) => {
  let id = req.body.id;
  let password = req.body.password;
  const userToDelete = await User.findOne({
    where: {
      id: id,
    },
  });
  if (bcrypt.compareSync(password, userToDelete.password)) {
    User.update({
      username:"deleted"
    },{
      where: {
        id: id,
      },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            status: "User was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete User with id=" + id,
        });
      });
  } else {
    res.status(500).send({
      message: "Wrong password",
    });
  }
};

// Delete user (admin)
exports.deleteAdmin = async (req, res) => {
  let id = req.body.id;

  User.destroy({
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          status: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
