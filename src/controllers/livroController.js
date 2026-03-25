const { criarLivro, listarLivros, deletarLivro } = require('../services/livroService');

const criar = async (req, res) => {
    const { titulo, autor } = req.body;

    if (!titulo || !autor) return res.status(400)
        .json({ erro: 'titulo e autor são obrigatórios'})

    const livro = await criarLivro(titulo, autor);
    res.status(201).json(livro);
}

const listar = async (req, res) => {
    const livros = await listarLivros();
    res.status(200).json(livros);
}

const deletar = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ erro: 'id é obrigatório' });
    }

    await deletarLivro(id);
    res.status(204).send();
}

module.exports = { criar, listar, deletar };