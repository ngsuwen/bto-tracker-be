const { INTEGER } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("projects", { // table name
    name: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    launch: {
      type: Sequelize.STRING,
    },
    no_of_units: {
      type: Sequelize.INTEGER,
    },
    unit_types: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    price_range_2R: {
      type: Sequelize.RANGE(Sequelize.INTEGER),
    },
    price_range_3R: {
      type: Sequelize.RANGE(Sequelize.INTEGER),
    },
    price_range_4R: {
      type: Sequelize.RANGE(Sequelize.INTEGER),
    },
    price_range_5R: {
      type: Sequelize.RANGE(Sequelize.INTEGER),
    },
    price_range_3Gen: {
      type: Sequelize.RANGE(Sequelize.INTEGER),
    },
    articles: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    status: {
      type: Sequelize.STRING,
    },
  });

  return Project;
};

//https://sequelize.org/v3/docs/models-definition/
