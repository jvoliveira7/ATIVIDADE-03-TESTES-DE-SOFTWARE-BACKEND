const { Livro } = require('../models');

const criarLivro = async (titulo, autor) => {
  const livro = await Livro.create({ titulo, autor });
  return {
    id: livro.id,
    titulo: livro.titulo,
    autor: livro.autor,
  };
};

listarLivros = async () => {
  const livros = await Livro.findAll();
  return livros;
};

const deletarLivro = async (id) => {
    await Livro.destroy({where: { id }});
}

module.exports = { criarLivro, listarLivros, deletarLivro };