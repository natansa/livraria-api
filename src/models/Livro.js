const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Autor = require('./Autor');
// const Venda = require('./Venda');

class Livro extends Model {}

Livro.init({
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
  sequelize,
  modelName: 'Livro',
  tableName: 'livros',
  timestamps: false
});

Livro.belongsTo(Autor, { foreignKey: 'autor_id' });
// Livro.hasMany(Venda, { foreignKey: 'livro_id' });

module.exports = Livro;