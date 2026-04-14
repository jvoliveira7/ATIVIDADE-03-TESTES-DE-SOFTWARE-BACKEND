const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Multa = sequelize.define('Multa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pendente' // Pode ser 'pendente' ou 'paga'
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    emprestimo_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'multas',
    timestamps: true, 
    underscored: false,
});

module.exports = Multa;