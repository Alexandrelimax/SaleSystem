const {Router} = require('express');
const ProductsController = require('../controllers/ProductsController')
const productRoutes = Router();


productRoutes.get('/products', ProductsController.getProducts);
productRoutes.post('/products',ProductsController.createProduct);

productRoutes.get('/products/:id', ProductsController.getThisProduct);
productRoutes.put('/products/:id',ProductsController.editThatProduct);
productRoutes.patch('/products/:id',ProductsController.editThisAtribute);
productRoutes.delete('/products/:id', ProductsController.removeThisProduct);

productRoutes.get('/products/fornecedores', ProductsController.getProductsAndSuppliers);
productRoutes.get('/products/categoria',ProductsController.getProductsByCategories);

module.exports = productRoutes;