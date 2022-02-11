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
      unique: true,
    },
    no_of_units: {
      type: Sequelize.INTEGER,
    },
    unit_types: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    unit_breakdown: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
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
    admin: {
      type: Sequelize.BOOLEAN,
    },
    data_scraper: {
      type: Sequelize.BOOLEAN,
    },
    preview_url: {
      type: Sequelize.STRING,
    },
    location_url: {
      type: Sequelize.STRING,
    },
  });

  return Project;
};

//https://sequelize.org/v3/docs/models-definition/
