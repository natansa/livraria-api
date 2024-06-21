const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.post('/livro', auth, authorize(['admin']), livroController.createLivro);
router.put('/livro', auth, authorize(['admin']), livroController.updateLivro);
router.delete('/livro/:livroId', auth, authorize(['admin']), livroController.deleteLivro);
router.get('/livro', auth, authorize(['admin', 'user']), livroController.getLivros);
router.get('/livro/:livroId', auth, authorize(['admin', 'user']), livroController.getLivroById);
router.post('/livro/info', auth, authorize(['admin']), livroController.createLivroInfo);
router.put('/livro/info', auth, authorize(['admin']), livroController.updateLivroInfo);
router.delete('/livro/info/:livroId', auth, authorize(['admin']), livroController.deleteLivroInfo);
router.post('/livro/:livroId/avaliacao', auth, authorize(['admin', 'user']), livroController.createAvaliacao);
router.delete('/livro/:livroId/avaliacao/:index', auth, authorize(['admin']), livroController.deleteAvaliacao);

module.exports = router;