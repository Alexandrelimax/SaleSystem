const { Model, DataTypes } = require("sequelize");

module.exports = class Product extends Model {
  
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        preco: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        quantidade: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'product',
      }
    );
  }
  

}
