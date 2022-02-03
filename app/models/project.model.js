const { INTEGER } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("projects", { // table name
    name: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    no_of_units: {
      type: Sequelize.INTEGER,
    },
    unit_types: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    price_range: {
      type: Sequelize.RANGE(Sequelize.INTEGER),
    },
    status: {
      type: Sequelize.STRING,
    },
  });

  return Project;
};

//https://sequelize.org/v3/docs/models-definition/
