const { Router } = require('express');
const ClientController = require('../controllers/ClientController');
const clientRoutes = Router();


clientRoutes.get('/clients', ClientController.showAllClients);
clientRoutes.put('/profile/:id', ClientController.getClient);

clientRoutes.get('/profile/:id/endereco', ClientController.getClientAddress);
clientRoutes.post('/profile/:id/endereco', ClientController.saveClientAddress);
// clientRoutes.get('/profile/:id/endereco/:endereco_id',);
// clientRoutes.put('/profile/endereco/:endereco_id');

clientRoutes.get('/profile/:id/telefone',ClientController.getClientTelephone );
clientRoutes.post('/profile/:id/telefone', ClientController.saveClientTelephone);
clientRoutes.get('/profile/:id/telefone/:telefone', ClientController.getOnlyOneTelephone);
clientRoutes.patch('/profile/:id/telefone/:telefone_id', ClientController.setOnlyOneTelephone);




module.exports = clientRoutes;

















