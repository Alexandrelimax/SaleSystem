const { Model, DataTypes } = require('sequelize');

module.exports = class Payment extends Model {
    static init(sequelize) {
        super.init({
            payment_state: {
                type: DataTypes.ENUM('APROVADO', 'PENDENTE', 'CANCELADO'),
                allowNull: false,
            },
            payment_type: {
                type: DataTypes.ENUM('PIX', 'BOLETO', 'DEBITO', 'CREDITO'),
                allowNull: false,
            },

        },
            {
                sequelize,
                modelName: 'payment',
            })
    }
}