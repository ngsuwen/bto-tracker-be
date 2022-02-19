const db = require("../models/index");
const Queue = db.queue; // queue table
const Project = db.projects; // projects table

// Create and save a new Queue
exports.create = async (req, res) => {
  // Create a Queue
  const project = await Project.findOne({
    where: {
      launch: req.body.launch,
    },
  });

  const queue = {
    date: req.body.date,
    number: req.body.number,
    unit_type: req.body.unit_type,
    queue_type: req.body.queue_type,
    validation: req.body.validation,
    status: req.body.status,
    projectId: project.id,
    fk_launch: project.launch,
  };

  // Save Queue in the database
  Queue.create(queue)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Queue.",
      });
    });
};

// Retrieve all queue with launch
exports.find = (req, res) => {
  let launch = req.params.launch;

  Queue.findAll({
    where: {
      fk_launch: launch,
      status: false,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Queue with launch=${launch}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error retrieving Queue with launch=" + launch,
      });
    });
};

// Retrieve all queue with launch and type
exports.findOne = (req, res) => {
  let launch = req.params.launch;
  let type = req.params.unit_type;

  Queue.findAll({
    where: {
      fk_launch: launch,
      unit_type: type,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Queue with launch=${launch} and unit type=${type}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error retrieving Queue with launch=" + launch + " and unit type=" + type,
      });
    });
};

// Update a Queue by launch and type and queue
exports.update = (req, res) => {
  let launch = req.params.launch;
  let type = req.params.unit_type;
  let queue = req.params.queue;

  Queue.update(req.body, {
    where: {
      fk_launch: launch,
      unit_type: type,
      number: queue,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send(req.body);
      } else {
        res.send({
          message: `Cannot update Queue with launch=${launch} and unit type=${type}. Maybe Queue was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error updating Queue with launch=" + launch + "and unit type=" + type,
      });
    });
};

// Delete a Queue by launch and type
exports.delete = async(req, res) => {
  let launch = req.params.launch;
  let type = req.params.unit_type;
  let queue = req.params.queue;

  Queue.destroy({
    where: {
      fk_launch: launch,
      unit_type: type,
      number: queue,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Queue was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Queue with launch=${launch} and unit type=${type}. Maybe Queue was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Could not delete Queue with launch=" + launch + "and unit type=" + type,
      });
    });
};
