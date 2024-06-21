const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: API para gerenciamento de clientes
 */

/**
 * @swagger
 * /api/cliente:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do cliente
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 description: Email do cliente
 *                 example: "joao.silva@example.com"
 *               telefone:
 *                 type: string
 *                 description: Telefone do cliente
 *                 example: "123456789"
 *               endereco:
 *                 type: string
 *                 description: Endereço do cliente
 *                 example: "Rua das Flores, 123"
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', clienteController.createCliente);

/**
 * @swagger
 * /api/cliente:
 *   put:
 *     summary: Atualiza um cliente existente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID do cliente
 *                 example: "1"
 *               nome:
 *                 type: string
 *                 description: Nome do cliente
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 description: Email do cliente
 *                 example: "joao.silva@example.com"
 *               telefone:
 *                 type: string
 *                 description: Telefone do cliente
 *                 example: "123456789"
 *               endereco:
 *                 type: string
 *                 description: Endereço do cliente
 *                 example: "Rua das Flores, 123"
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Cliente não encontrado
 */
router.put('/', clienteController.updateCliente);

/**
 * @swagger
 * /api/cliente/{clienteId}:
 *   delete:
 *     summary: Deleta um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
router.delete('/:clienteId', clienteController.deleteCliente);

/**
 * @swagger
 * /api/cliente:
 *   get:
 *     summary: Retorna a lista de clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 */
router.get('/', clienteController.getClientes);

/**
 * @swagger
 * /api/cliente/{clienteId}:
 *   get:
 *     summary: Retorna um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente não encontrado
 */
router.get('/:clienteId', clienteController.getClienteById);

module.exports = router;
