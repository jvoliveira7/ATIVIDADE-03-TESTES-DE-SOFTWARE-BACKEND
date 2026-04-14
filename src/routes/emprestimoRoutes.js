const { Router } = require('express');
const router = Router();
const emprestimoController = require('../controllers/emprestimoController');

router.post("/", emprestimoController.criar);
router.get("/", emprestimoController.listar);


router.get('/usuario/:usuario_id', emprestimoController.buscarPorUsuario);

router.get("/:id", emprestimoController.buscarPorId);
router.delete("/:id", emprestimoController.deletar);
router.put("/:id", emprestimoController.atualizar);
router.put('/:id/devolucao', emprestimoController.atualizar);

module.exports = router;