'use strict'


var logger = require('../logger');
var express = require('express');
var async = require('async');
var Webserver = express(); 
var _ = require('lodash')
var server = require('http').createServer(Webserver);
var middleware = require('./middleware');
var routes = require('./routes');
var port = process.env.PORT || 3000;


(function(app) {    

    module.exports.app = app;
    
    //middleware routes
    middleware(app,()=> {
      // routes 
      routes(app);
    });

    // server listener module
    module.exports.listen = function (callback, p) {
        //check the port
        if(!_.isUndefined(p)) port = p;

        //check if the address is on use or not
        //on case throught the error this method callback an error about
        server.on('error', function (err) {
          if (err.code === 'EADDRINUSE') {
            logger.error('Address in use, exiting...')
            server.close()
          } else {
            logger.error(err.message)
            throw err
          }
        })
    
        server.listen(port, '0.0.0.0', function () {
          logger.info('webservice is now listening on port: ' + port);  
          if(_.isFunction(callback)) return callback();
        })
      }
    

})(Webserver);