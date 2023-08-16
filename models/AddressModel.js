const { Model, DataTypes } = require('sequelize');

module.exports = class Address extends Model {

    static init(sequelize) {
        super.init({
            street: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            number: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            complement: {
                type: DataTypes.STRING,
                allowNull: true
            },
            neighborhood: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            zip_code: {
                type: DataTypes.STRING(8),
                allowNull: false,
            },
            city:{
                type:DataTypes.STRING,
                allowNull: false,
                
            },
            state:{
                type:DataTypes.STRING,
                allowNull: false,
                
            },
            client_id:{
                type:DataTypes.INTEGER,
                references:{model: 'clients', key: 'id'},
                onDelete: 'CASCADE'
            },
            supplier_id: {
                type: DataTypes.INTEGER,
                references: { model: 'suppliers', key: 'id' },
                onDelete: 'CASCADE',
            },
            order_id:{
                type:DataTypes.INTEGER,
                references:{model:'orders', key: 'id'},
                onDelete: 'CASCADE',
            },
        },
            {
                sequelize,
                modelName: 'address'
            });
    }
}