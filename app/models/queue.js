module.exports = (sequelize, Sequelize) => {
  const Queue = sequelize.define("queue", {
    // table name
    date: {
      type: Sequelize.DATE,
    },
    number: {
      type: Sequelize.INTEGER,
    },
    unit_type: {
      type: Sequelize.STRING,
    },
    queue_type: {
      type: Sequelize.STRING,
    },
    validation: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
    acknowledged: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Queue;
};

//https://sequelize.org/v3/docs/models-definition/
