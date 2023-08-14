const {Router} = require('express');
const SupplierController = require('../controllers/SupplierController')
const supplierRoutes = Router();



supplierRoutes.get('/fornecedor',SupplierController.showSuppliers) 
supplierRoutes.post('/fornecedor', SupplierController.saveSupplier); //cadastrar 1

supplierRoutes.get('/fornecedor/:id', SupplierController.getSupplier);
supplierRoutes.put('/fornecedor/:id', SupplierController.setSupplier);
supplierRoutes.delete('/fornecedor/:id', SupplierController.deleteSupplier);

supplierRoutes.get('/fornecedor/:id/telefone',SupplierController.getSupplierPhones);
supplierRoutes.post('/fornecedor/:id/telefone',SupplierController.saveSupplierPhone);
// supplierRoutes.get('/fornecedor/:id/telefone/:telefone_id',SupplierController.getOnlyOneSupplierPhone);
// supplierRoutes.patch('/fornecedor/:id/telefone/:telefone_id',SupplierController.setOnlyOneSupplierPhone);
// supplierRoutes.delete('/fornecedor/:id/telefone/:telefone_id',SupplierController.deleteOnlyOneSupplierPhone);

supplierRoutes.get('/fornecedor/:id/endereco', SupplierController.getSupplierAddress);
supplierRoutes.post('/fornecedor/:id/endereco', SupplierController.saveSupplierAddress);
supplierRoutes.put('/fornecedor/:id/endereco/:endereco_id', SupplierController.setSupplierAddress);
supplierRoutes.delete('/fornecedor/:id/endereço/:endereco_id', SupplierController.deleteSupplierAddress);

// supplierRoutes.get('/fornecedor/:fornecedor_id/categoria/:category_id');

// supplierRoutes.get('/fornecedor/:fornecedor_id/categoria/:category_id/product/:product_id');
// supplierRoutes.post('/fornecedor/:fornecedor_id/categoria/:category_id/product/:product_id', SupplierController.repurchaseProduct);


module.exports = supplierRoutes;