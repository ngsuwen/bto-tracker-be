const users = require("../controllers/user.js");

var router = require("express").Router();

// Create a new unit
router.post("/", users.create);

// Retrieve a user 
router.get("/:username", users.findOne);

// Update a user
router.put("/", users.update);

// Delete a user
router.delete("/", users.delete);

module.exports = router;
