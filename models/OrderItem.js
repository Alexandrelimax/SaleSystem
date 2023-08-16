const { Model, DataTypes } = require('sequelize');

module.exports = class OrderItem extends Model{
    static init(sequelize){
        super.init({
            product_id:{
                type:DataTypes.INTEGER,
                references:{model:'products', key: 'id'},
                onDelete: 'RESTRICT'
            },
            order_id:{
                type:DataTypes.INTEGER,
                references:{model:'orders', key: 'id'},
                onDelete: 'RESTRICT',
            },
            quantity:{
                type:DataTypes.INTEGER,
                allowNull: false,

            },

        },
        {
            sequelize,
            modelName: 'order_item',
        })
    }
}