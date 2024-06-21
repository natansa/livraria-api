const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Autor = require('./Autor');

const Livro = sequelize.define('Livro', {
  livro_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.NUMERIC,
    allowNull: false,
  },
  estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  autor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Autor,
      key: 'autor_id',
    },
  },
}, {
  tableName: 'livros',
  timestamps: false
});

module.exports = Livro;