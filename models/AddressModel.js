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
                type:DataTypes.INTEGER,
                allowNull: false,
                
            },
            state:{
                type:DataTypes.INTEGER,
                allowNull: false,
                
            },
            client_id:{
                type:DataTypes.INTEGER,
                allowNull: false,
                references:{model: 'clients', key: 'id'},
                onDelete: 'CASCADE'
            },
            supplier_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'suppliers', key: 'id' },
                onDelete: 'CASCADE',
            },
        },
            {
                sequelize,
                modelName: 'address'
            });
    }
}