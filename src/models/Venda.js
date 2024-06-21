const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');
const Livro = require('./Livro');

class Venda extends Model {}

Venda.init({
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
}, {
  sequelize,
  modelName: 'Venda',
  tableName: 'vendas',
  timestamps: false
});

Venda.belongsTo(Cliente, { foreignKey: 'cliente_id' });
Venda.belongsTo(Livro, { foreignKey: 'livro_id' });

module.exports = Venda;
