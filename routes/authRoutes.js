const { Router } = require('express');
const AuthenticationController = require('../controllers/AuthenticationController');
const authRoutes = Router();


authRoutes.get('/', AuthenticationController.showLogin);
authRoutes.get('/login', AuthenticationController.showLogin);
authRoutes.post('/login', AuthenticationController.enterSystem);

authRoutes.get('/register', AuthenticationController.showRegister);
authRoutes.post('/register', AuthenticationController.register);

module.exports = authRoutes;