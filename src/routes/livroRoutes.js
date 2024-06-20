const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');
const auth = require('../middleware/auth');

router.post('/livro', auth, livroController.createLivro);
router.put('/livro', auth, livroController.updateLivro);
router.delete('/livro/:livroId', auth, livroController.deleteLivro);
router.get('/livro', livroController.getLivros);
router.get('/livro/:livroId', livroController.getLivroById);

router.post('/livro/info', auth, livroController.createLivroInfo);
router.put('/livro/info', auth, livroController.updateLivroInfo);
router.delete('/livro/info/:livroId', auth, livroController.deleteLivroInfo);

router.post('/livro/:livroId/avaliacao', auth, livroController.createAvaliacao);
router.delete('/livro/:livroId/avaliacao/:index', auth, livroController.deleteAvaliacao);

module.exports = router;