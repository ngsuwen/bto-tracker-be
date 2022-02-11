const units = require("../controllers/unit.js");

var router = require("express").Router();

// Create a new unit
router.post("/", units.create);

// Retrieve all units with launch and blk
router.get("/:launch", units.findAll);

// Update a unit with launch, blk and unit to be edited
router.put("/:launch/:blk/:unit", units.update);

// Delete a unit with launch, blk and unit to be deleted
router.delete("/:launch/:blk/:unit", units.delete);

module.exports = router;
