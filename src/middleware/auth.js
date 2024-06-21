const Cliente = require('../models/Cliente');
const bcrypt = require('bcryptjs');

const adminUser = 'admin';
const adminPassword = 'desafio-igti-nodejs';

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No credentials sent!' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [email, password] = credentials.split(':');

  if (email === adminUser && password === adminPassword) {
    req.user = { email: adminUser, role: 'admin' };
    return next();
  }

  try {
    const cliente = await Cliente.findOne({ where: { email } });
    if (!cliente) {
      return res.status(401).json({ error: 'Invalid credentials!' });
    }

    //const isPasswordValid = await bcrypt.compare(password, cliente.senha);
    if (password != cliente.senha) {
      return res.status(401).json({ error: 'Invalid credentials!' });
    }

    req.user = { id: cliente.cliente_id, email: cliente.email, role: 'user' };
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};