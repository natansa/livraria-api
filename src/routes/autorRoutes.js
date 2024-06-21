const express = require('express');
const router = express.Router();
const autorController = require('../controllers/autorController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Autores
 *   description: API para gerenciamento de autores
 */

/**
 * @swagger
 * /api/autor:
 *   post:
 *     summary: Cria um novo autor
 *     tags: [Autores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do autor
 *                 example: "J.K. Rowling"
 *     responses:
 *       201:
 *         description: Autor criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', auth, authorize(['admin']), autorController.createAutor);

/**
 * @swagger
 * /api/autor:
 *   put:
 *     summary: Atualiza um autor existente
 *     tags: [Autores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID do autor
 *                 example: "1"
 *               nome:
 *                 type: string
 *                 description: Nome do autor
 *                 example: "J.K. Rowling"
 *     responses:
 *       200:
 *         description: Autor atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Autor não encontrado
 */
router.put('/', auth, authorize(['admin']), autorController.updateAutor);

/**
 * @swagger
 * /api/autor/{autorId}:
 *   delete:
 *     summary: Deleta um autor pelo ID
 *     tags: [Autores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: autorId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do autor
 *     responses:
 *       200:
 *         description: Autor deletado com sucesso
 *       404:
 *         description: Autor não encontrado
 */
router.delete('/:autorId', auth, authorize(['admin']), autorController.deleteAutor);

/**
 * @swagger
 * /api/autor:
 *   get:
 *     summary: Retorna a lista de autores
 *     tags: [Autores]
 *     responses:
 *       200:
 *         description: Lista de autores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Autor'
 */
router.get('/', auth, authorize(['admin', 'user']), autorController.getAutores);

/**
 * @swagger
 * /api/autor/{autorId}:
 *   get:
 *     summary: Retorna um autor pelo ID
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: autorId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do autor
 *     responses:
 *       200:
 *         description: Autor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Autor'
 *       404:
 *         description: Autor não encontrado
 */
router.get('/:autorId', auth, authorize(['admin', 'user']), autorController.getAutorById);

module.exports = router;