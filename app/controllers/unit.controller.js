const db = require("../models/index");
const Unit = db.units; // table name
const Op = db.Sequelize.Op;

// Create and Save a new Unit
exports.create = (req, res) => {
  // Create a Unit
  const unit = {
    launch: req.body.launch,
    blk: req.body.blk,
    unit: req.body.unit,
    unit_type: req.body.unit_type,
    price: req.body.price,
    availability: req.body.availability,
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

// Retrieve all Units from the database.
exports.findAll = (req, res) => {
  Unit.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Units.",
      });
    });
};

// Find a single Unit with launch
exports.findOne = (req, res) => {
  let launch = req.params.launch

  Unit.findAll({
    where: {
      "launch": launch,
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

// Update a Unit by launch
exports.update = (req, res) => {
  let launch = req.params.launch

  Unit.update(req.body, {
    where: { "launch": launch },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Unit was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Unit with launch=${launch}. Maybe Unit was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Unit with launch=" + launch,
      });
    });
};

// Delete a Unit by launch
exports.delete = (req, res) => {
  let launch = req.params.launch

  Unit.destroy({
    where: { "launch": launch },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Unit was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Unit with launch=${launch}. Maybe Unit was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Unit with launch=" + launch,
      });
    });
};
