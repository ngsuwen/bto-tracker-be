const db = require("../models/index");
const bcrypt = require("bcrypt");
const User = db.user;

exports.create = async (req, res) => {

  const user = await User.findOne({
    where: {
      "username": req.body.username,
    },
  });
  if (!user){
    res.send({
      message: "Cannot create session.",
    });
  }
  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (isValid) {
    req.session.user = user;
    console.log(req.session)
    res.send(req.session.user);
  } else {
    res.send({
      message: "Cannot create session.",
    });
  }
};

exports.findOne = (req, res) => {
  if (req.session.user){
    res.send(req.session.user);
  } else {
    res.send({
      message: "No valid session.",
    });
  };
};


exports.delete = (req, res) => {
  req.session.destroy(() => {
    res.send({
      message: "Session is deleted successfully.",
    });
  });
};
