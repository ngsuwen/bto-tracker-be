const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

// db.sequelize.sync({ alter: true })
// .then(() => {
//     console.log("updated db");
//   })
// .catch((error) => console.log("error", error));

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// controllers
const projectController = require("./app/routes/project")
app.use("/api/project", projectController)
const unitController = require("./app/routes/unit")
app.use("/api/units", unitController)
const userController = require("./app/routes/user")
app.use("/api/user", userController)

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});