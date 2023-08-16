const {Router} = require('express');
const OrderController = require('../controllers/OrderController')
const orderRoutes = Router();

orderRoutes.get('/order/:id',OrderController.getPedido)
orderRoutes.post('/client/:client_id/product/:product_id/pedido',OrderController.createPedido)



module.exports = orderRoutes;