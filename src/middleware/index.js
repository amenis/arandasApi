'use strict'

var async = require('async');
var path = require('path');
var logger = require('../../logger');
var bodyParser = require('body-parser');
var session = require('express-session');
var moment =require('moment');
var Chance = require('chance');
// routers
var chance = new Chance();
var middleware = {};
module.exports = function (app, callback) {
    middleware = require('./authenticated');
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

    //headers
    app.use(allowCrossDomain);
        
    var cookie = {
        httpOnly: true,
        maxAge:  1000 * 60 * 60 * 24 * 365
    };
    
    async.waterfall([
       function (next) {
        app.use(
            session({
                secret: chance.hash() + chance.md5(),
                cookie: cookie,
                saveUninitialized: false,
                resave: false
            })
        )
        next()
       }
    ],
    function(err, s){
        if(err) {
            logger.error(err);
            throw new Error(err);
            callback(err, null)
        }
        callback(middleware, s);
    });
}

//CORS
function allowCrossDomain (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,accesstoken,X-RToken,X-Token'
    )
  
    if (req.method === 'OPTIONS') {
      res.sendStatus(200)
    } else {
      next()
    }
  }

  