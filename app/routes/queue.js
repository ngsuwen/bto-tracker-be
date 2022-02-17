const queue = require("../controllers/queue.js");

var router = require("express").Router();

// Create a new queue
router.post("/", queue.create);

// Retrieve all queue with launch and type
router.get("/:launch/:unit_type", queue.find);

// Update a queue with launch, unit type and queue to be edited
router.put("/:launch/:unit_type/:queue", queue.update);

// Delete a queue with launch, unit type and queue to be deleted
router.delete("/:launch/:unit_type/:queue", queue.delete);

module.exports = router;
