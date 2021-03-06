'use strict'

var express = require('express');
var router = express.Router();
var logger = require('../../logger');
var path = require('path');
var controllers = require('../controllers');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

function MainRoutes(router, controllers, middleware) {
    
    router.get('/',(req, res)=>  {
        res.sendFile(path.join(__dirname,'../view/index.html'));
    });

    //accounts 
    router.get('/api/pruebas', controllers.accounts.prueba);
    router.post('/api/login', controllers.accounts.login);
    router.post('/api/register', controllers.accounts.saveAccount);
    router.post('/api/userData', controllers.accounts.saveUserData);
    
    //stores
    router.post('/api/addNewStore', controllers.stores.newStore);
    router.post('/api/addNewProduct', controllers.stores.addNewProduct);
    router.get('/api/getProductStore/:id', middleware.authenticated, controllers.stores.getProductByStore);

    //deliveryMan
    router.post('/api/registerDelivery', controllers.deliveryMan.newRegister);

    //orders
    router.post('/api/newOrder', [middleware.authenticated, multipartMiddleware], controllers.kardex.createOrder);
    router.post('/api/seeOrder', [middleware.authenticated, multipartMiddleware], controllers.kardex.seeOrders);

}

function  handleErrors(err, req, res) {
    var status = err.status || 500;
    res.status(err.status);
    
    if(status === 404){
        res.status('404').send({layout: false});
        return 
    }

    if(status === 503){
        res.status('503').send({layout: false });
        return
    }

    logger.warn(err.stack);
    res.send('error', {
        message: err,
        error: err,
        layout: false
    });
}

function handle404(req, res){
    res.status(404).send({layout: false });
    
}

module.exports = (app, middleware ) => {
    MainRoutes(router, controllers,middleware);
    app.use('/', router);  
    app.use(handle404);
    app.use(handleErrors);
};
