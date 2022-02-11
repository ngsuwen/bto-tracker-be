const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  operatorsAliases: 0,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.projects = require("./project.js")(sequelize, Sequelize); // table name
db.units = require("./unit.js")(sequelize, Sequelize); // table name

// associations
db.projects.hasMany(db.units)
db.units.belongsTo(db.projects, {foreignKey: 'fk_launch', targetKey: 'launch'})

module.exports = db;

