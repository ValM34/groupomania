// Imports
const express = require('express');
const usersCtrl = require('./routes/usersCtrl');
const models = require('./models');

// Router
exports.router = (function() {
    const apiRouter = express.Router();

    //Users routes
    apiRouter.route('/signup').post(usersCtrl.signup);
    apiRouter.route('/signin').post(usersCtrl.signin);

    return apiRouter;
})(); // les () font une instance pour le router c'est important