'use strict'


var winston = require('winston');
var express = require('express');
var Webserver = express(); 
var _ = require('lodash')
var server = require('http').createServer(Webserver);
var port = process.env.PORT || 3000


;(function(app) {

    

    // server listener module
    module.exports.listen = function (callback, p) {
        //check the port
        if(!_.isUndefined(p)) port = p;

        //check if the address is on use or not
        //on case throught the error this method callback an error about
        server.on('error', function (err) {
          if (err.code === 'EADDRINUSE') {
            winston.error('Address in use, exiting...')
            server.close()
          } else {
            winston.error(err.message)
            throw err
          }
        })
    
        server.listen(port, '0.0.0.0', function () {
          winston.info('TruDesk is now listening on port: ' + port);    
          if(_.isFunction(callback)) return callback;
        })
      }
    

})(Webserver);