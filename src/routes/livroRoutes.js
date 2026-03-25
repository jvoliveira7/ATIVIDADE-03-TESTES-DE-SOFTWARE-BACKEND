const { Router } = require('express');
const { criar, listar, deletar } = require('../controllers/livroController');

const router = Router();

router.post("/", criar);
router.get("/", listar);
router.delete('/:id', deletar);

module.exports = router;