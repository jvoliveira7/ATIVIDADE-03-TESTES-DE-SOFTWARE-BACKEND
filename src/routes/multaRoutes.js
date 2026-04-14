const express = require('express');
const router = express.Router();
const multaController = require('../controllers/multaController');

router.post('/', multaController.criar);
router.get('/', multaController.listar);
router.get('/:id', multaController.buscarPorId);
router.delete('/:id', multaController.deletar);
router.get('/usuario/:usuario_id', multaController.buscarPorUsuario);
router.put('/:id/pagamento', multaController.registrarPagamento);

router.put('/:id', multaController.registrarPagamento); 

module.exports = router;