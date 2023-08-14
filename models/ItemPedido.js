const { Model, DataTypes } = require('sequelize');

module.exports = class OrderItem extends Model{
    static init(sequelize){
        super.init({
            product_id:{
                type:DataTypes.INTEGER,
                allowNull: false,
                references:{model:'products', key: 'id'},
                onDelete: 'RESTRICT'
            },
            sale_product_id:{
                type:DataTypes.INTEGER,
                allowNull:false,
                references:{model:'sale_products', key: 'id'},
                onDelete: 'RESTRICT',
            },
            quantidade:{
                type:DataTypes.INTEGER,
                allowNull: false,

            },
            desconto:{
                type:DataTypes.FLOAT,
                allowNull: true,

            }

        },
        {
            sequelize,
            modelName: 'order_item',
        })
    }
}