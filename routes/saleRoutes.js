const {Router} = require('express');
const saleRoutes = Router();

saleRoutes.get('/user/:user_id/order');
saleRoutes.post('/user/:user_id/order');

saleRoutes.get('/user/:user_id/order/endereco');
saleRoutes.post('/user/:user_id/order/endereco');

saleRoutes.get('/user/:user_id/order/endereco/pagamento');
saleRoutes.post('/user/:user_id/order/endereco/pagamento');

saleRoutes.get('/user/:user_id/order/endereco/pagamento/pix');
saleRoutes.post('/user/:user_id/order/endereco/pagamento/pix');

saleRoutes.get('/user/:user_id/order/endereco/pagamento/boleto');
saleRoutes.post('/user/:user_id/order/endereco/pagamento/boleto');

saleRoutes.get('/user/:user_id/order/endereco/pagamento/credito');
saleRoutes.post('/user/:user_id/order/endereco/pagamento/credito');



module.exports = saleRoutes;
