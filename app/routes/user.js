const users = require("../controllers/user.js");

var router = require("express").Router();

// Create a new unit
router.post("/", users.create);

// Retrieve all users
router.get("/", users.findAll);

// Retrieve a user 
router.get("/:username", users.findOne);

// Update a user password
router.put("/", users.update);

// Update a user (admin)
router.put("/admin", users.updateAdmin);

// Delete a user
router.delete("/", users.delete);

// Delete a user (admin)
router.delete("/admin", users.deleteAdmin);

module.exports = router;
