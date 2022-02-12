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
      }
    });
  
    return Unit;
  };