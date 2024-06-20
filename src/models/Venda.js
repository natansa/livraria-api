const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');
const Livro = require('./Livro');

const Venda = sequelize.define('Venda', {
  venda_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  valor: {
    type: DataTypes.NUMERIC,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Cliente,
      key: 'cliente_id',
    },
  },
  livro_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Livro,
      key: 'livro_id',
    },
  },
});

module.exports = Venda;
