const { Multa } = require('../models');

const criarMulta = async (usuario_id, emprestimo_id, valor) => {
    const multa = await Multa.create({ usuario_id, emprestimo_id, valor });
    return multa;
};

const listarMultas = async () => {
    const multas = await Multa.findAll();
    return multas;
};

const pegarPorId = async (id) => {
    const multa = await Multa.findByPk(id);
    return multa;
};

const deletarMulta = async (id) => {
    return await Multa.destroy({ where: { id } });
};

const listarPorUsuario = async (usuario_id) => {
    const multas = await Multa.findAll({ where: { usuario_id } });
    return multas;
};

const pagarMulta = async (id) => {
    const multa = await Multa.findByPk(id);
    if (!multa) throw new Error('Multa não encontrada');

    multa.status = 'paga';
    await multa.save();
    return multa;
};

module.exports = { criarMulta, listarMultas, pegarPorId, deletarMulta, listarPorUsuario, pagarMulta };