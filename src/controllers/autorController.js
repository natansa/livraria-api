const Autor = require('../models/Autor');

exports.createAutor = async (req, res) => {
  const { nome, email, telefone } = req.body;
  try {
    const autor = await Autor.create({ nome, email, telefone });
    res.status(201).json(autor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAutor = async (req, res) => {
  const { id, nome, email, telefone } = req.body;
  try {
    const autor = await Autor.findByPk(id);
    if (!autor) {
      return res.status(404).json({ error: 'Autor not found' });
    }
    await autor.update({ nome, email, telefone });
    res.status(200).json(autor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAutor = async (req, res) => {
  const { autorId } = req.params;
  try {
    const autor = await Autor.findByPk(autorId);
    if (!autor) {
      return res.status(404).json({ error: 'Autor not found' });
    }
    await autor.destroy();
    res.status(200).json({ message: 'Autor deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAutores = async (req, res) => {
  try {
    const autores = await Autor.findAll();
    res.status(200).json(autores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAutorById = async (req, res) => {
  const { autorId } = req.params;
  try {
    const autor = await Autor.findByPk(autorId);
    if (!autor) {
      return res.status(404).json({ error: 'Autor not found' });
    }
    res.status(200).json(autor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
