const { Model, DataTypes } = require('sequelize');

module.exports = class Supplier extends Model {
    static init(sequelize) {
        super.init({
            company: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            cnpj: {
                type: DataTypes.CHAR(14),
                allowNull: false,
            },
            business_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

        },
        {
            sequelize,
            modelName: 'supplier'
        })
    }
}