module.exports = (sequelize, Sequelize) => {
  const Unit = sequelize.define("units", { // table name
    launch: {
        type: Sequelize.STRING,
    },
    blk: {
      type: Sequelize.STRING,
    },
    unit: {
      type: Sequelize.STRING,
    },
    unit_type: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    availability: {
      type: Sequelize.BOOLEAN,
    }
  });

  return Unit;
};

//https://sequelize.org/v3/docs/models-definition/
