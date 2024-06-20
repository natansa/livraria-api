const Livro = require('../models/Livro');
const LivroInfo = require('../models/LivroInfo');

exports.createLivro = async (req, res) => {
  const { nome, valor, estoque, autor_id } = req.body;
  try {
    const livro = await Livro.create({ nome, valor, estoque, autor_id });
    res.status(201).json(livro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLivro = async (req, res) => {
  const { id, valor, estoque } = req.body;
  try {
    const livro = await Livro.findByPk(id);
    if (!livro) {
      return res.status(404).json({ error: 'Livro not found' });
    }
    await livro.update({ valor, estoque });
    res.status(200).json(livro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLivro = async (req, res) => {
  const { livroId } = req.params;
  try {
    const livro = await Livro.findByPk(livroId);
    if (!livro) {
      return res.status(404).json({ error: 'Livro not found' });
    }
    await livro.destroy();
    res.status(200).json({ message: 'Livro deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLivros = async (req, res) => {
  try {
    const livros = await Livro.findAll();
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLivroById = async (req, res) => {
  const { livroId } = req.params;
  try {
    const livro = await Livro.findByPk(livroId);
    if (!livro) {
      return res.status(404).json({ error: 'Livro not found' });
    }
    const livroInfo = await LivroInfo.findOne({ livroId: livro.livro_id });
    res.status(200).json({ livro, livroInfo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLivroInfo = async (req, res) => {
  const { livroId, descricao, paginas, editora } = req.body;
  try {
    const livroInfo = new LivroInfo({ livroId, descricao, paginas, editora });
    await livroInfo.save();
    res.status(201).json(livroInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLivroInfo = async (req, res) => {
  const { livroId, descricao, paginas, editora } = req.body;
  try {
    const livroInfo = await LivroInfo.findOne({ livroId });
    if (!livroInfo) {
      return res.status(404).json({ error: 'LivroInfo not found' });
    }
    await livroInfo.update({ descricao, paginas, editora });
    res.status(200).json(livroInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLivroInfo = async (req, res) => {
  const { livroId } = req.params;
  try {
    const livroInfo = await LivroInfo.findOne({ livroId });
    if (!livroInfo) {
      return res.status(404).json({ error: 'LivroInfo not found' });
    }
    await livroInfo.remove();
    res.status(200).json({ message: 'LivroInfo deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAvaliacao = async (req, res) => {
  const { livroId } = req.params;
  const { clienteNome, nota, descricao } = req.body;
  try {
    const livroInfo = await LivroInfo.findOne({ livroId });
    if (!livroInfo) {
      return res.status(404).json({ error: 'LivroInfo not found' });
    }
    livroInfo.avaliacoes.push({ clienteNome, nota, descricao });
    await livroInfo.save();
    res.status(201).json(livroInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAvaliacao = async (req, res) => {
  const { livroId, index } = req.params;
  try {
    const livroInfo = await LivroInfo.findOne({ livroId });
    if (!livroInfo) {
      return res.status(404).json({ error: 'LivroInfo not found' });
    }
    livroInfo.avaliacoes.splice(index, 1);
    await livroInfo.save();
    res.status(200).json(livroInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
