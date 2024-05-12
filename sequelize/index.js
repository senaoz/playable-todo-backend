const Sequelize = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  },
);

const modelDefiners = [
  require("../models/user"),
  require("../models/todo"),
  require("../models/auth"),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

sequelize.sync();

module.exports = sequelize;
