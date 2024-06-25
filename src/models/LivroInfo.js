const mongoose = require('mongoose');

const LivroInfoSchema = new mongoose.Schema({
  livroId: { type: Number, required: true },
  descricao: { type: String, required: true },
  paginas: { type: Number, required: true },
  editora: { type: String, required: true },
  avaliacoes: [{
    clienteNome: String,
    nota: Number,
    descricao: String,
  }],
});

const LivroInfo = mongoose.model('livroinfos', LivroInfoSchema);

module.exports = LivroInfo;