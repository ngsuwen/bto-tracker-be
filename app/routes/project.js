const projects = require("../controllers/project.js");

var router = require("express").Router();

// Create a new project
router.post("/", projects.create);

// Retrieve all projects
router.get("/", projects.findAll);

// Retrieve a single Project with launch
router.get("/:launch", projects.findOne);

// Update a Project with launch
router.put("/:launch", projects.update);

// Delete a Project with launch
router.delete("/:launch", projects.delete);

module.exports = router;
