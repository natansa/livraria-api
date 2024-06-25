const mongoose = require('mongoose');
require('dotenv').config();

const LivroInfo = require('../models/LivroInfo');
const mongoUrl = process.env.MONGO_URL;

const livroInfos = [
  {
    livroId: 1,
    descricao: "O livro trata a respeito de criação de APIs com Node.js, levando ao leitor os principais conceitos necessários para a implementação",
    paginas: 250,
    editora: "Editora IGTI",    
    avaliacoes: []
  },
  {
    livroId: 2,
    descricao: "O livro passa uma visão geral sobre o JavaScript moderno, quais as principais estruturas e exemplos de utilização",
    paginas: 350,
    editora: "Editora IGTI",    
    avaliacoes: []
  },
  {
    livroId: 3,
    descricao: "O livro demonstra na prática a utilização do Express em conjunto com o Node.js para criação de APIs",
    paginas: 150,
    editora: "Editora IGTI",    
    avaliacoes: []
  },
  {
    livroId: 4,
    descricao: "O livro aborda na teoria e na prática os bancos de dados relacionais, desde a sua motivação até a construção e consulta de registros",
    paginas: 450,
    editora: "Editora IGTI",    
    avaliacoes: []
  },
  {
    livroId: 5,
    descricao: "O livro faz uma introdução aos bancos de dados NoSQL, em especial os bancos de dados orientados a documentos",
    paginas: 100,
    editora: "Editora IGTI",    
    avaliacoes: []
  },
  {
    livroId: 6,
    descricao: "O livro aborda na teoria a importância e utilização da autorização e autenticação em APIs com Node.js e Express",
    paginas: 90,
    editora: "Editora IGTI",    
    avaliacoes: []
  }
];

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  initializeDatabase();
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

async function initializeDatabase() {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections({ name: 'livroinfos' }).toArray();
  
    if (collections.length === 0) {
      await db.createCollection('livroinfos');
    }

    await LivroInfo.insertMany(livroInfos);
    console.log('Data initialized');
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}

module.exports = mongoose;
