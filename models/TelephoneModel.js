const { Model, DataTypes } = require('sequelize');

module.exports = class Telephone extends Model {
    static init(sequelize) {
        super.init({
            number: {
                type: DataTypes.STRING(11),
                allowNull: false
            },
            client_id:{
                type: DataTypes.INTEGER,
                
                references: {model:'clients', key: 'id'},
                onDelete: 'CASCADE'
            },
            supplier_id: {
                type: DataTypes.INTEGER,
                
                references: { model: 'suppliers', key: 'id' },
                onDelete: 'CASCADE',
            },
        },
        {
            sequelize,
            modelName: 'telephone'
        });
    }
}
