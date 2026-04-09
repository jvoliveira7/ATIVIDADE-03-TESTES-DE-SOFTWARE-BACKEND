const sequelize = require('../database/sequelize');
const Livro = require('./Livro');
const Usuario = require('./Usuario');
const Emprestimo = require('./Emprestimo');

Emprestimo.belongsTo(Livro, { foreignKey: 'livro_id' });
Emprestimo.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = {
  sequelize,
  Livro,
  Usuario,
  Emprestimo,
};