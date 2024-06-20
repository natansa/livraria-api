// src/scripts/insertData.js
const sequelize = require('../config/database');
const Cliente = require('../models/Cliente');
const Autor = require('../models/Autor');
const Livro = require('../models/Livro');
const Venda = require('../models/Venda');
const LivroInfo = require('../models/LivroInfo');
const mongo = require('../config/mongo');
const inserts = require('../../inserts-1');

async function insertData() {
  await sequelize.sync({ force: true });

  await Cliente.bulkCreate(inserts.clientes);
  await Autor.bulkCreate(inserts.autores);
  await Livro.bulkCreate(inserts.livros);
  await Venda.bulkCreate(inserts.vendas);

  await LivroInfo.insertMany(inserts.livroInfo);

  console.log('Data inserted successfully');
}

insertData().catch(console.error).finally(() => sequelize.close());
