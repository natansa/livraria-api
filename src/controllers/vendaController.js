const Venda = require('../models/Venda');
const Livro = require('../models/Livro');

exports.createVenda = async (req, res) => {
  const { data, cliente_id, livro_id } = req.body;
  try {
    const livro = await Livro.findByPk(livro_id);
    if (!livro || livro.estoque <= 0) {
      return res.status(400).json({ error: 'Livro sem estoque' });
    }
    const venda = await Venda.create({ data, cliente_id, livro_id, valor: livro.valor });
    await livro.update({ estoque: livro.estoque - 1 });
    res.status(201).json(venda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVendas = async (req, res) => {
  try {
    const vendas = await Venda.findAll();
    res.status(200).json(vendas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVendaById = async (req, res) => {
  const { vendaId } = req.params;
  try {
    const venda = await Venda.findByPk(vendaId);
    if (!venda) {
      return res.status(404).json({ error: 'Venda not found' });
    }
    res.status(200).json(venda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVendasByCliente = async (req, res) => {
  const { clienteId } = req.params;
  try {
    const vendas = await Venda.findAll({ where: { cliente_id: clienteId } });
    res.status(200).json(vendas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVendasByLivro = async (req, res) => {
  const { livroId } = req.params;
  try {
    const vendas = await Venda.findAll({ where: { livro_id: livroId } });
    res.status(200).json(vendas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVendasByAutor = async (req, res) => {
  const { autorId } = req.params;
  try {
    const vendas = await Venda.findAll({
      include: {
        model: Livro,
        where: { autor_id: autorId },
      },
    });
    res.status(200).json(vendas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};