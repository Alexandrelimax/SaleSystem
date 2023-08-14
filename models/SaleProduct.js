const { Model, DataTypes } = require('sequelize');

module.exports = class SaleProduct extends Model {
    static init(sequelize) {
        super.init({
            order_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            client_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'clients', key: 'id' },
                onDelete: 'RESTRICT'
            },
            address_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'addresses', key: 'id' },
                onDelete: 'RESTRICT',
            },
            payment_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'payments', key: 'id' },
                onDelete: 'RESTRICT',
            },


        },
            {
                sequelize,
                modelName: 'sale_product',
            })
    }
    efetuarPagamento(){
        
    }
}