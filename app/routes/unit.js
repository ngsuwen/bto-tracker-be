const units = require("../controllers/unit.js");

var router = require("express").Router();

// Create a new unit
router.post("/", units.create);

// Retrieve all units with launch
router.get("/:launch", units.findAll);

// Retrieve feedback for units
router.get("/feedback/:launch", units.findFeedback);

// Remove feedback
router.delete("/feedback/:launch", units.deleteFeedback);

// Update a unit with launch, and unit to be edited
router.put("feedback/:launch/:unit", units.updateFeedback);

// Retrieve all units with launch and blk
router.get("/:launch/:blk", units.findBlk);

// Update a unit with launch, blk and unit to be edited
router.put("/:launch/:blk/:unit", units.update);

// Delete a unit with launch, blk and unit to be deleted
router.delete("/:launch/:blk/:unit", units.delete);

module.exports = router;
