const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

const app = express();

var corsOptions = {
  origin: ["http://localhost:3000","https://ngsuwen.github.io", "http://bto-tracker.herokuapp.com"],
};
app.set('trust proxy', 1)

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
// db.sequelize.sync();

// db.sequelize.sync({ alter: true })
// .then(() => {
//     console.log("updated db");
//   })
// .catch((error) => console.log("error", error));

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// sessions
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      sameSite: 'none',
      secure: true
    }
  })
);

const sessionController = require("./app/routes/session");
app.use("/api/sessions", sessionController);

//check if there is valid session
app.use((req, res, next)=>{
  console.log(req.session)
  next()
})

// controllers
const projectController = require("./app/routes/project");
app.use("/api/project", projectController);
const unitController = require("./app/routes/unit");
app.use("/api/units", unitController);
const userController = require("./app/routes/user");
app.use("/api/user", userController);
const queueController = require("./app/routes/queue");
app.use("/api/queue", queueController);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
