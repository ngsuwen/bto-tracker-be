const sessions = require("../controllers/session.js");
var router = require("express").Router();

// Create a session
router.post("/", sessions.create);

// Create a session
router.get("/", sessions.findOne);

// Delete a session
router.delete("/", sessions.delete);

module.exports = router;