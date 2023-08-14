const { Model, DataTypes } = require("sequelize");

module.exports = class Category extends Model{
    static init(sequelize){
        super.init({
            nome:{
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