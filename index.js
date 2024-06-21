const express = require('express');
const app = express();
const sequelize = require('./src/config/database');
const mongo = require('./src/config/mongo');
require('dotenv').config();

const { swaggerUi, specs } = require('./src/config/swagger');

app.use(express.json());

const clienteRoutes = require('./src/routes/clienteRoutes');
const autorRoutes = require('./src/routes/autorRoutes');
const livroRoutes = require('./src/routes/livroRoutes');
const vendaRoutes = require('./src/routes/vendaRoutes');

app.use('/api/cliente', clienteRoutes);
app.use('/api/autor', autorRoutes);
app.use('/api/livro', livroRoutes);
app.use('/api/venda', vendaRoutes);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = app;
