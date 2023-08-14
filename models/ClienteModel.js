const { Model, DataTypes } = require('sequelize');

module.exports = class Client extends Model{
    static init(sequelize){
        super.init({
            first_name:{
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            last_name:{
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            cpf:{
                type: DataTypes.STRING(11),
                allowNull: false,
                unique: true,
            },
            email:{
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            

        },
        {
            sequelize,
            modelName: 'client'
        });

    }
}

