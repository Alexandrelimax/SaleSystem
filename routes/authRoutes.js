const { Router } = require('express');
const AuthenticationController = require('../controllers/AuthenticationController');
const authRoutes = Router();



authRoutes.post('/login', AuthenticationController.enterSystem);
authRoutes.post('/register', AuthenticationController.register);

module.exports = authRoutes;