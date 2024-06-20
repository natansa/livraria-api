// tests/integration.test.js
const request = require('supertest');
const app = require('../index'); // Assumindo que o Express app está exportado de index.js
const sequelize = require('../src/config/database');
const Cliente = require('../src/models/Cliente');
const Autor = require('../src/models/Autor');
const Livro = require('../src/models/Livro');
const Venda = require('../src/models/Venda');
const LivroInfo = require('../src/models/LivroInfo');
const inserts = require('../inserts-1'); // Ajuste o caminho conforme necessário

describe('Integration tests', () => {
  let createdAuthorId;
  let createdBookId;
  let createdClientId;
  let createdSaleId;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await Cliente.bulkCreate(inserts.clientes);
    await Autor.bulkCreate(inserts.autores);
    await Livro.bulkCreate(inserts.livros);
    await Venda.bulkCreate(inserts.vendas);
    await LivroInfo.insertMany(inserts.livroInfo);
  });

  afterAll(async () => {
    await sequelize.close();
    await LivroInfo.deleteMany({});
  });

  test('should create an author and verify it', async () => {
    const response = await request(app)
      .post('/api/autor')
      .auth('admin', 'desafio-igti-nodejs')
      .send({ nome: 'Autor Teste', email: 'autor@teste.com', telefone: '123456789' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('autor_id');
    createdAuthorId = response.body.autor_id;
  });

  test('should create a book and verify it', async () => {
    const response = await request(app)
      .post('/api/livro')
      .auth('admin', 'desafio-igti-nodejs')
      .send({ nome: 'Livro Teste', valor: 50, estoque: 10, autor_id: createdAuthorId });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('livro_id');
    createdBookId = response.body.livro_id;
  });

  test('should create a client and verify it', async () => {
    const response = await request(app)
      .post('/api/cliente')
      .send({ nome: 'Cliente Teste', email: 'cliente@teste.com', senha: '123456', telefone: '123456789', endereco: 'Rua Teste' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('cliente_id');
    createdClientId = response.body.cliente_id;
  });

  test('should create a sale and verify it', async () => {
    const response = await request(app)
      .post('/api/venda')
      .auth('admin', 'desafio-igti-nodejs')
      .send({ data: '2023-06-19', cliente_id: createdClientId, livro_id: createdBookId });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('venda_id');
    createdSaleId = response.body.venda_id;
  });

  test('should update an author and verify it', async () => {
    const response = await request(app)
      .put('/api/autor')
      .auth('admin', 'desafio-igti-nodejs')
      .send({ id: createdAuthorId, nome: 'Autor Teste Atualizado', email: 'autor@teste.com', telefone: '987654321' });

    expect(response.statusCode).toBe(200);
    expect(response.body.nome).toBe('Autor Teste Atualizado');
  });

  test('should update a book and verify it', async () => {
    const response = await request(app)
      .put('/api/livro')
      .auth('admin', 'desafio-igti-nodejs')
      .send({ id: createdBookId, valor: 60, estoque: 5 });

    expect(response.statusCode).toBe(200);
    expect(response.body.valor).toBe(60);
  });

  test('should update a client and verify it', async () => {
    const response = await request(app)
      .put('/api/cliente')
      .auth('cliente@teste.com', '123456')
      .send({ id: createdClientId, nome: 'Cliente Teste Atualizado', email: 'cliente@teste.com', senha: '123456', telefone: '987654321', endereco: 'Rua Teste Atualizada' });

    expect(response.statusCode).toBe(200);
    expect(response.body.nome).toBe('Cliente Teste Atualizado');
  });

  test('should get all clients and verify it', async () => {
    const response = await request(app)
      .get('/api/cliente')
      .auth('admin', 'desafio-igti-nodejs');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('should get a client by id and verify it', async () => {
    const response = await request(app)
      .get(`/api/cliente/${createdClientId}`)
      .auth('admin', 'desafio-igti-nodejs');

    expect(response.statusCode).toBe(200);
    expect(response.body.cliente_id).toBe(createdClientId);
  });

  test('should delete a sale and verify it', async () => {
    const response = await request(app)
      .delete(`/api/venda/${createdSaleId}`)
      .auth('admin', 'desafio-igti-nodejs');

    expect(response.statusCode).toBe(200);
  });

  test('should delete a book and verify it', async () => {
    const response = await request(app)
      .delete(`/api/livro/${createdBookId}`)
      .auth('admin', 'desafio-igti-nodejs');

    expect(response.statusCode).toBe(200);
  });

  test('should delete an author and verify it', async () => {
    const response = await request(app)
      .delete(`/api/autor/${createdAuthorId}`)
      .auth('admin', 'desafio-igti-nodejs');

    expect(response.statusCode).toBe(200);
  });

  test('should delete a client and verify it', async () => {
    const response = await request(app)
      .delete(`/api/cliente/${createdClientId}`)
      .auth('admin', 'desafio-igti-nodejs');

    expect(response.statusCode).toBe(200);
  });

  test('should create and delete a livro info and verify it', async () => {
    await request(app)
      .post('/api/livro/info')
      .auth('admin', 'desafio-igti-nodejs')
      .send({ livroId: createdBookId, descricao: 'Descrição do Livro Teste', paginas: 300, editora: 'Editora Teste' });

    const response = await request(app)
      .delete(`/api/livro/info/${createdBookId}`)
      .auth('admin', 'desafio-igti-nodejs');

    expect(response.statusCode).toBe(200);
  });

  test('should create and delete an avaliacao and verify it', async () => {
    await request(app)
      .post(`/api/livro/${createdBookId}/avaliacao`)
      .auth('admin', 'desafio-igti-nodejs')
      .send({ clienteNome: 'Cliente Teste', nota: 5, descricao: 'Excelente livro!' });

    const response = await request(app)
      .delete(`/api/livro/${createdBookId}/avaliacao/0`)
      .auth('admin', 'desafio-igti-nodejs');

    expect(response.statusCode).toBe(200);
  });
});
