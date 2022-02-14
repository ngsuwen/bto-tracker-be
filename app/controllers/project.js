const db = require("../models/index");
const Project = db.projects; // table name
const Op = db.Sequelize.Op;

// Create and Save a new project
exports.create = (req, res) => {
  // Create a Project
  const project = {
    name: req.body.name,
    location: req.body.location,
    launch: req.body.launch,
    no_of_units: req.body.no_of_units,
    unit_types: req.body.unit_types,
    price_range_2R: req.body.price_range_2R || null,
    price_range_3R: req.body.price_range_3R || null,
    price_range_4R: req.body.price_range_4R || null,
    price_range_5R: req.body.price_range_5R || null,
    price_range_3Gen: req.body.price_range_3Gen || null,
    status: req.body.status,
    unit_breakdown: req.body.unit_breakdown,
    articles: req.body.articles,
    admin: false,
    data_scraper: false,
    preview_url: req.body.preview_url,
    location_url: req.body.location_url,
  };

  // Save Project in the database
  Project.create(project)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the project.",
      });
    });
};

// Retrieve all projects from the database.
exports.findAll = (req, res) => {
  Project.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects.",
      });
    });
};

// Find a single Project with launch
exports.findOne = (req, res) => {
  let launch = req.params.launch

  Project.findOne({
    where: {
      "launch": launch,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Project with launch=${launch}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Project with launch=" + launch,
      });
    });
};

// Update a Project by launch
exports.update = (req, res) => {
  let launch = req.params.launch

  Project.update(req.body, {
    where: { "launch": launch },
  })
    .then((num) => {
      if (num == 1) {
        res.send(req.body);
      } else {
        res.send({
          message: `Cannot update project with launch=${launch}. Maybe project was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating project with launch=" + launch,
      });
    });
};

// Delete a Project by launch
exports.delete = (req, res) => {
  let launch = req.params.launch

  Project.destroy({
    where: { "launch": launch },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Project was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete project with launch=${launch}. Maybe project was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete project with launch=" + launch,
      });
    });
};
