const request = require('supertest');
const app = require('../index');
const mongoose = require('../src/config/mongo');

const adminAuth = Buffer.from('admin:desafio-igti-nodejs').toString('base64');

describe('Integration tests for Autor', () => {
  let autorId;

  // Teste para criar um novo autor
  test('should create a new autor', async () => {
    const response = await request(app)
      .post('/api/autor')
      .set('Authorization', `Basic ${adminAuth}`)
      .send({
        nome: 'J.K. Rowling',
        email: 'teste@teste.com.br',
        telefone: '11986693279'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('autor_id');
    autorId = response.body.autor_id;
  });

  // Teste para atualizar um autor existente
  test('should update an autor', async () => {
    const response = await request(app)
      .put('/api/autor')
      .set('Authorization', `Basic ${adminAuth}`)
      .send({
        id: autorId,
        nome: 'J.K. Rowling Atualizado',
        email: 'teste@teste.com.br',
        telefone: '11986693279'
      });

    expect(response.statusCode).toBe(200);
  });

  // Teste para listar todos os autores
  test('should list all autores', async () => {
    const response = await request(app)
      .get('/api/autor')
      .set('Authorization', `Basic ${adminAuth}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Teste para obter um autor específico
  test('should get a specific autor', async () => {
    const response = await request(app)
      .get(`/api/autor/${autorId}`)
      .set('Authorization', `Basic ${adminAuth}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('autor_id');
  });

  // Teste para deletar um autor
  test('should delete an autor', async () => {
    const response = await request(app)
      .delete(`/api/autor/${autorId}`)
      .set('Authorization', `Basic ${adminAuth}`);

    expect(response.statusCode).toBe(200);
  });

  // Fechar a conexão com o MongoDB após todos os testes
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
