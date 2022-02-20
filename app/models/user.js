module.exports = (sequelize, Sequelize) => {
    const Unit = sequelize.define("users", { // table name
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      validation: {
        type: Sequelize.STRING,
      },
      msg: {
        type: Sequelize.STRING,
      }
    });
  
    return Unit;
  };