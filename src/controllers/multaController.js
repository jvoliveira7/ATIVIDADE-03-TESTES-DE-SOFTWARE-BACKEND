const { criarMulta, listarMultas, pegarPorId, deletarMulta, listarPorUsuario, pagarMulta } = require('../services/multaService');

const criar = async (req, res) => {
    try {
        const { usuario_id, emprestimo_id, valor } = req.body;

        // O Jest espera erro 400 se faltar usuario_id ou valor
        if (!usuario_id) return res.status(400).json({ erro: 'usuario_id é obrigatório' });
        if (!valor) return res.status(400).json({ erro: 'valor é obrigatório' });
        // Adicionando emprestimo_id por segurança
        if (!emprestimo_id) return res.status(400).json({ erro: 'emprestimo_id é obrigatório' });

        const multa = await criarMulta(usuario_id, emprestimo_id, valor);
        res.status(201).json(multa);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

const listar = async (req, res) => {
    const multas = await listarMultas();
    res.status(200).json(multas);
};

const buscarPorId = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ erro: 'id é obrigatório' });
    
    const multa = await pegarPorId(id);
    if (!multa) return res.status(404).json({ erro: 'Multa não encontrada' });
    
    res.status(200).json(multa);
};

const deletar = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ erro: 'id é obrigatório' });
    
    const apagada = await deletarMulta(id);
    if (!apagada) return res.status(404).json({ erro: 'Multa não encontrada' });

    res.status(200).send();
};

const buscarPorUsuario = async (req, res) => {
    const { usuario_id } = req.params;
    if (!usuario_id) return res.status(400).json({ erro: 'usuario_id é obrigatório' });

    const multas = await listarPorUsuario(usuario_id);
    res.status(200).json(multas);
};

const registrarPagamento = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ erro: 'id é obrigatório' });

        const multaAtualizada = await pagarMulta(id);
        res.status(200).json(multaAtualizada);
    } catch (error) {
        const status = error.message === 'Multa não encontrada' ? 404 : 400;
        res.status(status).json({ erro: error.message });
    }
};

module.exports = { criar, listar, buscarPorId, deletar, buscarPorUsuario, registrarPagamento };