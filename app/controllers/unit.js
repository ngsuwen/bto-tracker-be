const db = require("../models/index");
const Unit = db.units; // units table
const Project = db.projects; // projects table
const Op = db.Sequelize.Op;

// Create and Save a new Unit
exports.create = async(req, res) => {
  // Create a Unit
  const project = await Project.findOne({
    where: {
      "launch": req.body.launch,
    },
  })

  console.log(project)

  const unit = {
    blk: req.body.blk,
    unit: req.body.unit,
    unit_type: req.body.unit_type,
    price: req.body.price,
    availability: req.body.availability,
    projectId: project.id,
    fk_launch: project.launch
  };

  // Save Unit in the database
  Unit.create(unit)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the unit.",
      });
    });
};

// Retrieve all units with launch
exports.findAll = (req, res) => {
  let launch = req.params.launch

  Unit.findAll({
    where: {
      "fk_launch": launch,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Unit with launch=${launch}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Unit with launch=" + launch,
      });
    });
};

// Retrieve all units with launch and blk
exports.findBlk = (req, res) => {
  let launch = req.params.launch
  let blk = req.params.blk

  Unit.findAll({
    where: {
      "fk_launch": launch,
      "blk": blk
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Unit with launch=${launch} and blk=${blk}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Unit with launch=" + launch + " and blk=" + blk,
      });
    });
};

// Retrieve feedback
exports.findFeedback = (req, res) => {
  let launch = req.params.launch

  Unit.findAll({
    where: {
      "fk_launch": launch,
      "blk": null
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Unit with launch=${launch} and blk=${blk}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Unit with launch=" + launch + " and blk=" + blk,
      });
    });
};

// Update a Unit by launch
exports.update = (req, res) => {
  let launch = req.params.launch
  let blk = req.params.blk
  let unit = req.params.unit

  Unit.update(req.body, {
    where: { 
      "fk_launch": launch,
      "blk": blk,
      "unit": unit
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          status: "Unit was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Unit with launch=${launch} and blk=${blk}. Maybe Unit was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Unit with launch=" + launch + "and blk=" + blk,
      });
    });
};

// Delete a Unit by launch
exports.delete = (req, res) => {
  let launch = req.params.launch
  let blk = req.params.blk
  let unit = req.params.unit

  Unit.destroy({
    where: { 
      "launch": launch,
      "blk": blk,
      "unit": unit
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Unit was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Unit with launch=${launch} and blk=${blk}. Maybe Unit was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Unit with launch=" + launch + "and blk=" + blk,
      });
    });
};
