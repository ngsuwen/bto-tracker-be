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

// require models
db.projects = require("./project.js")(sequelize, Sequelize);
db.units = require("./unit.js")(sequelize, Sequelize);
db.user = require("./user.js")(sequelize, Sequelize);
db.queue = require("./queue.js")(sequelize, Sequelize);

// associations
db.projects.hasMany(db.units)
db.units.belongsTo(db.projects, {foreignKey: 'fk_launch', targetKey: 'launch'})
db.projects.hasMany(db.user)
db.user.belongsTo(db.projects, {foreignKey: 'fk_launch', targetKey: 'launch'})
db.projects.hasMany(db.queue)
db.queue.belongsTo(db.projects, {foreignKey: 'fk_launch', targetKey: 'launch'})

module.exports = db;