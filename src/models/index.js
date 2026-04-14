const sequelize = require('../database/sequelize');
const Livro = require('./Livro');
const Usuario = require('./Usuario');
const Emprestimo = require('./emprestimo');

const Multa = require('./Multa'); 

Emprestimo.belongsTo(Livro, { foreignKey: 'livro_id' });
Emprestimo.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Multa.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Multa.belongsTo(Emprestimo, { foreignKey: 'emprestimo_id', as: 'emprestimo' });

module.exports = {
  sequelize,
  Livro,
  Usuario,
  Emprestimo,
  Multa, 
};