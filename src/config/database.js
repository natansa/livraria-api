const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: 'postgres',
});

module.exports = sequelize;
