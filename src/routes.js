const { Router } = require('express');
const UserController = require('./controllers/user-controller');
const authController = require('./controllers/auth-controller.js');

const routes = new Router();

routes.post('/login', authController.Login);
routes.post('/login/register', UserController.newUser);
module.exports = routes;
