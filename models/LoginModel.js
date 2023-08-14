const { Model, DataTypes } = require('sequelize');

module.exports = class Login extends Model {
    static init(sequelize) {
        super.init({
            user_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            client_id:{
                type:DataTypes.INTEGER,
                allowNull: false,
                references:{model: 'clients', key: 'id'},
                onDelete: 'CASCADE'
            },

        },
            {
                sequelize,
                modelName: 'login',
                tableName: 'login'
            })
    }
}