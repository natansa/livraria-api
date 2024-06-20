// index.js
const express = require('express');
const app = express();
const sequelize = require('./src/config/database');
const mongo = require('./src/config/mongo');
require('dotenv').config();

// Middleware
app.use(express.json());

// Rotas
const clienteRoutes = require('./src/routes/clienteRoutes');
const autorRoutes = require('./src/routes/autorRoutes');
const livroRoutes = require('./src/routes/livroRoutes');
const vendaRoutes = require('./src/routes/vendaRoutes');

app.use('/api', clienteRoutes);
app.use('/api', autorRoutes);
app.use('/api', livroRoutes);
app.use('/api', vendaRoutes);

// Sincronização com o banco de dados
sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = app; // Exporta o app para os testes
