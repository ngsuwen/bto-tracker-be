const db = require("../models/index");
const bcrypt = require("bcrypt");
const User = db.user;
const Project = db.projects; // projects table

// Create user
exports.create = async (req, res) => {
  const project = await Project.findOne({
    where: {
      launch: req.body.launch,
    },
  });

  const user = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    role: req.body.role,
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
        message:
          err.message || "Some error occurred while retrieving users.",
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

// Update user
exports.update = async (req, res) => {
  let username = req.body.username;
  let oldPassword = req.body.oldPassword;
  let newPassword = bcrypt.hashSync(
    req.body.newPassword,
    bcrypt.genSaltSync(10)
  );

  const userToUpdate = await User.findOne({
    where: {
      username: username,
    },
  });

  if (bcrypt.compareSync(oldPassword, userToUpdate.password)) {
    User.update(
      { password: newPassword },
      {
        where: {
          username: username,
        },
      }
    )
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully.",
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

// Delete user
exports.delete = async(req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  const userToDelete = await User.findOne({
    where: {
      username: username,
    },
  });
  if (bcrypt.compareSync(password, userToDelete.password)) {
    User.destroy({
      where: {
        username: username,
      },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete User with username=${username}. Maybe User was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete User with username=" + username,
        });
      });
  } else {
    res.status(500).send({
      message: "Wrong password",
    });
  }
};
