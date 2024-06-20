const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.post('/cliente', clienteController.createCliente);
router.put('/cliente', clienteController.updateCliente);
router.delete('/cliente/:clienteId', clienteController.deleteCliente);
router.get('/cliente', clienteController.getClientes);
router.get('/cliente/:clienteId', clienteController.getClienteById);

module.exports = router;
