const express = require('express');
const router = express.Router();
const vendaController = require('../controllers/vendaController');
const auth = require('../middleware/auth');

router.post('/venda', auth, vendaController.createVenda);
router.get('/venda', vendaController.getVendas);
router.get('/venda/:vendaId', vendaController.getVendaById);
router.get('/venda', vendaController.getVendasByCliente);
router.get('/venda', vendaController.getVendasByLivro);
router.get('/venda', vendaController.getVendasByAutor);

module.exports = router;