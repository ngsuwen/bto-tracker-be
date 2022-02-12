const sessions = require("../controllers/session.js");
var router = require("express").Router();

// Create a session
router.post("/", sessions.create);

// Delete a session
router.delete("/", sessions.delete);

module.exports = router;