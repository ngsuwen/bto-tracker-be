module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("projects", { // table name
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Project;
};

//https://sequelize.org/v3/docs/models-definition/
