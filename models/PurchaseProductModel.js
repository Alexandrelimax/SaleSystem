const { Model, DataTypes } = require('sequelize');

module.exports = class PurchaseProduct extends Model {
    static init(sequelize) {
        super.init({
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'products', key: 'id' },
                onDelete: 'CASCADE'
            },
            supplier_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'suppliers', key: 'id' },
                onDelete: 'RESTRICT'
            },
            data_compra: {
                type: DataTypes.DATE,
                allowNull:true,
                
            },
            quantidade:{
                type:DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'purchase_product'
        })
    }
}