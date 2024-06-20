// src/middleware/auth.js
const bcrypt = require('bcryptjs');
const Cliente = require('../models/Cliente');

const basicAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const [type, credentials] = authHeader.split(' ');
  if (type !== 'Basic') {
    return res.status(401).json({ message: 'Invalid authorization type' });
  }

  const [email, senha] = Buffer.from(credentials, 'base64').toString().split(':');
  
  if (email === 'admin' && senha === 'desafio-igti-nodejs') {
    req.user = { isAdmin: true };
    return next();
  }

  const cliente = await Cliente.findOne({ where: { email } });
  if (!cliente || !bcrypt.compareSync(senha, cliente.senha)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  req.user = { id: cliente.cliente_id, email: cliente.email, isAdmin: false };
  next();
};

module.exports = basicAuth;