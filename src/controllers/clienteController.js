const Cliente = require('../models/Cliente');
const bcrypt = require('bcryptjs');

exports.createCliente = async (req, res) => {
  const { nome, email, senha, telefone, endereco } = req.body;
  try {
    const hashedSenha = bcrypt.hashSync(senha, 10);
    const cliente = await Cliente.create({ nome, email, senha: hashedSenha, telefone, endereco });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCliente = async (req, res) => {
  const { id, nome, email, senha, telefone, endereco } = req.body;

  if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente not found' });
    }
    const hashedSenha = bcrypt.hashSync(senha, 10);
    await cliente.update({ nome, email, senha: hashedSenha, telefone, endereco });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCliente = async (req, res) => {
  const { clienteId } = req.params;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente not found' });
    }
    await cliente.destroy();
    res.status(200).json({ message: 'Cliente deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClientes = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const clientes = await Cliente.findAll({
      attributes: { exclude: ['senha'] }
    });
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClienteById = async (req, res) => {
  const { clienteId } = req.params;

  if (req.user.role !== 'admin' && req.user.id !== parseInt(clienteId)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const cliente = await Cliente.findByPk(clienteId, {
      attributes: { exclude: ['senha'] }
    });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente not found' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
