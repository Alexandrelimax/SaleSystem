const { Model, DataTypes } = require("sequelize");

module.exports = class Category extends Model{
    static init(sequelize){
        super.init({
            name:{
                type: DataTypes.STRING(100),
                allowNull:false,
            }
        },
        {
            sequelize,
            modelName: 'category'
        });
    }

}