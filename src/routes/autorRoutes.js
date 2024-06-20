const express = require('express');
const router = express.Router();
const autorController = require('../controllers/autorController');
const auth = require('../middleware/auth');

router.post('/autor', auth, autorController.createAutor);
router.put('/autor', auth, autorController.updateAutor);
router.delete('/autor/:autorId', auth, autorController.deleteAutor);
router.get('/autor', autorController.getAutores);
router.get('/autor/:autorId', autorController.getAutorById);

module.exports = router;