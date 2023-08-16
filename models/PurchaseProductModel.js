const { Model, DataTypes } = require('sequelize');

module.exports = class PurchaseProduct extends Model {
    static init(sequelize) {
        super.init({
            product_id: {
                type: DataTypes.INTEGER,
                references: { model: 'products', key: 'id' },
                onDelete: 'CASCADE'
            },
            supplier_id: {
                type: DataTypes.INTEGER,
                references: { model: 'suppliers', key: 'id' },
                onDelete: 'RESTRICT'
            },
            purchase_date: {
                type: DataTypes.DATE,
                allowNull:true,
                
            },
            quantity:{
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
