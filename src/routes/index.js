'use strict'

var express = require('express');
var router = express.Router();
var logger = require('../../logger');
var path = require('path');

function MainRoutes(router) {
    
    router.get('/',(req, res)=>  {
        res.sendFile(path.join(__dirname,'../view/index.html'));
    });
}


function  handleErrors(err, req, res) {
    var status = err.status || 500;
    res.status(err.status);
    
    if(status === 404){
        res.render('404', {layout: false});
        return 
    }

    if(status === 503){
        res.render('503', {layout: false });
        return
    }

    logger.warn(err.stack);
    res.render('error', {
        message: err.message,
        error: err,
        layout: false
    });
}

function handle404(req, res){
    res.status(404).render('404', {layout: false});
}

module.exports = (app, middleware ) => {
    app.use('/', router);
    MainRoutes(router);
    app.use(handle404);
    app.use(handleErrors);
};
