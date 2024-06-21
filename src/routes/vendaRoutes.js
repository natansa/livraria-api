const express = require('express');
const router = express.Router();
const vendaController = require('../controllers/vendaController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Vendas
 *   description: API para gerenciamento de vendas
 */

/**
 * @swagger
 * /api/venda:
 *   post:
 *     summary: Cria uma nova venda
 *     tags: [Vendas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteId:
 *                 type: string
 *                 description: ID do cliente
 *                 example: "1"
 *               livroId:
 *                 type: string
 *                 description: ID do livro
 *                 example: "1"
 *               dataVenda:
 *                 type: string
 *                 description: Data da venda
 *                 format: date-time
 *                 example: "2023-06-20T00:00:00.000Z"
 *     responses:
 *       201:
 *         description: Venda criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', auth, authorize(['admin', 'user']), vendaController.createVenda);

/**
 * @swagger
 * /api/venda:
 *   get:
 *     summary: Retorna a lista de vendas
 *     tags: [Vendas]
 *     responses:
 *       200:
 *         description: Lista de vendas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venda'
 */
router.get('/', auth, authorize(['admin']), vendaController.getVendas);

/**
 * @swagger
 * /api/venda/{vendaId}:
 *   get:
 *     summary: Retorna uma venda pelo ID
 *     tags: [Vendas]
 *     parameters:
 *       - in: path
 *         name: vendaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da venda
 *     responses:
 *       200:
 *         description: Venda encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venda'
 *       404:
 *         description: Venda não encontrada
 */
router.get('/:vendaId', auth, authorize(['admin']), vendaController.getVendaById);

/**
 * @swagger
 * /api/venda/cliente/{clienteId}:
 *   get:
 *     summary: Retorna as vendas por cliente
 *     tags: [Vendas]
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Vendas encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venda'
 *       404:
 *         description: Nenhuma venda encontrada para este cliente
 */
router.get('/cliente/:clienteId', auth, authorize.onlySelf(), vendaController.getVendasByCliente);

/**
 * @swagger
 * /api/venda/livro/{livroId}:
 *   get:
 *     summary: Retorna as vendas por livro
 *     tags: [Vendas]
 *     parameters:
 *       - in: path
 *         name: livroId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Vendas encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venda'
 *       404:
 *         description: Nenhuma venda encontrada para este livro
 */
router.get('/livro/:livroId', auth, authorize(['admin']), vendaController.getVendasByLivro);

/**
 * @swagger
 * /api/venda/autor/{autorId}:
 *   get:
 *     summary: Retorna as vendas por autor
 *     tags: [Vendas]
 *     parameters:
 *       - in: path
 *         name: autorId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do autor
 *     responses:
 *       200:
 *         description: Vendas encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venda'
 *       404:
 *         description: Nenhuma venda encontrada para este autor
 */
router.get('/autor/:autorId', auth, authorize(['admin']), vendaController.getVendasByAutor);

module.exports = router;