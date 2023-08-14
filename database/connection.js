const { Sequelize } = require('sequelize');
const dbConfig = require('../config/configDataBase');
const Product = require('../models/ProductsModel');
const Category = require('../models/CategoryModel');
const Cliente = require('../models/ClienteModel');
const Telephone = require('../models/TelephoneModel');
const Address = require('../models/AddressModel');
const OrderItem = require('../models/ItemPedido');
const SaleProduct = require('../models/SaleProduct');
const Payment = require('../models/Payment');
const PurchaseProduct = require('../models/PurchaseProductModel');
const Supplier = require('../models/SupplierModel');
const Login = require('../models/LoginModel');

const sequelize = new Sequelize(dbConfig);

Product.init(sequelize);
Category.init(sequelize);
Cliente.init(sequelize);
Address.init(sequelize);
Telephone.init(sequelize);
SaleProduct.init(sequelize);
OrderItem.init(sequelize)
Payment.init(sequelize);
PurchaseProduct.init(sequelize);
Supplier.init(sequelize);
Login.init(sequelize);

Cliente.hasMany(Telephone);
Telephone.belongsTo(Cliente);
Cliente.hasMany(Address);
Address.belongsTo(Cliente);
Address.belongsTo(SaleProduct);
Payment.belongsTo(SaleProduct);
SaleProduct.hasOne(Address);
SaleProduct.hasOne(Payment);
Supplier.hasMany(Telephone);
Telephone.belongsTo(Supplier);
Supplier.hasMany(Address);
Address.belongsTo(Supplier);
Cliente.hasOne(Login);
Login.belongsTo(Cliente)

Product.belongsToMany(Category, { through: 'product_category' });
Category.belongsToMany(Product, { through: 'product_category' });

SaleProduct.belongsToMany(Product, { through: 'order_item' });
Product.belongsToMany(SaleProduct, { through: 'order_item' })

Product.belongsToMany(Supplier, { through: 'purchase_product' });
Supplier.belongsToMany(Product, { through: 'purchase_product' });


try {
    sequelize.authenticate();
    console.log('conectado!');

} catch (error) {
    console.log(error);
}


module.exports = sequelize;




