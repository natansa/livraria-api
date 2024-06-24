const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

/**
 * @swagger
 * tags:
 *   name: Livros
 *   description: API para gerenciamento de livros
 */

/**
 * @swagger
 * /api/livro:
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Livros]
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título do livro
 *                 example: "O Senhor dos Anéis"
 *               autorId:
 *                 type: integer
 *                 description: ID do autor
 *                 example: 1
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', auth, authorize(['admin']), livroController.createLivro);

/**
 * @swagger
 * /api/livro:
 *   put:
 *     summary: Atualiza um livro
 *     tags: [Livros]
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do livro
 *                 example: 1
 *               titulo:
 *                 type: string
 *                 description: Título do livro
 *                 example: "O Hobbit"
 *               autorId:
 *                 type: integer
 *                 description: ID do autor
 *                 example: 1
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.put('/', auth, authorize(['admin']), livroController.updateLivro);

/**
 * @swagger
 * /api/livro/{livroId}:
 *   delete:
 *     summary: Deleta um livro pelo ID
 *     tags: [Livros]
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: livroId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro deletado com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.delete('/:livroId', auth, authorize(['admin']), livroController.deleteLivro);

/**
 * @swagger
 * /api/livro:
 *   get:
 *     summary: Retorna a lista de livros
 *     tags: [Livros]
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Lista de livros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Livro'
 */
router.get('/', auth, authorize(['admin', 'user']), livroController.getLivros);

/**
 * @swagger
 * /api/livro/{livroId}:
 *   get:
 *     summary: Retorna um livro pelo ID
 *     tags: [Livros]
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: livroId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       404:
 *         description: Livro não encontrado
 */
router.get('/:livroId', auth, authorize(['admin', 'user']), livroController.getLivroById);

/**
 * @swagger
 * /api/livro/info:
 *   post:
 *     summary: Cria uma nova informação de livro
 *     tags: [Livros]
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               livroId:
 *                 type: integer
 *                 description: ID do livro
 *                 example: 1
 *               descricao:
 *                 type: string
 *                 description: Descrição do livro
 *                 example: "Descrição detalhada do livro"
 *     responses:
 *       201:
 *         description: Informação de livro criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/info', auth, authorize(['admin']), livroController.createLivroInfo);

/**
 * @swagger
 * /api/livro/info:
 *   put:
 *     summary: Atualiza uma informação de livro
 *     tags: [Livros]
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               livroId:
 *                 type: integer
 *                 description: ID do livro
 *                 example: 1
 *               descricao:
 *                 type: string
 *                 description: Descrição do livro
 *                 example: "Nova descrição do livro"
 *     responses:
 *       200:
 *         description: Informação de livro atualizada com sucesso
 *       404:
 *         description: Informação de livro não encontrada
 */
router.put('/info', auth, authorize(['admin']), livroController.updateLivroInfo);

/**
 * @swagger
 * /api/livro/info/{livroId}:
 *   delete:
 *     summary: Deleta uma informação de livro pelo ID do livro
 *     tags: [Livros]
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: livroId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Informação de livro deletada com sucesso
 *       404:
 *         description: Informação de livro não encontrada
 */
router.delete('/info/:livroId', auth, authorize(['admin']), livroController.deleteLivroInfo);

/**
 * @swagger
 * /api/livro/{livroId}/avaliacao:
 *   post:
 *     summary: Cria uma nova avaliação para um livro
 *     tags: [Livros]
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: livroId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avaliacao:
 *                 type: string
 *                 description: Avaliação do livro
 *                 example: "Ótimo livro!"
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/:livroId/avaliacao', auth, authorize(['admin', 'user']), livroController.createAvaliacao);

/**
 * @swagger
 * /api/livro/{livroId}/avaliacao/{index}:
 *   delete:
 *     summary: Deleta uma avaliação de um livro pelo índice
 *     tags: [Livros]
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: livroId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do livro
 *       - in: path
 *         name: index
 *         schema:
 *           type: integer
 *         required: true
 *         description: Índice da avaliação
 *     responses:
 *       200:
 *         description: Avaliação deletada com sucesso
 *       404:
 *         description: Avaliação não encontrada
 */
router.delete('/:livroId/avaliacao/:index', auth, authorize(['admin']), livroController.deleteAvaliacao);

module.exports = router;