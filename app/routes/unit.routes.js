const units = require("../controllers/unit.controller.js");

var router = require("express").Router();

// Create a new unit
router.post("/", units.create);

// Retrieve all units
router.get("/", units.findAll);

// Retrieve a single unit with launch
router.get("/:launch", units.findOne);

// Update a unit with launch
router.put("/:launch", units.update);

// Delete a unit with launch
router.delete("/:launch", units.delete);

module.exports = router;
