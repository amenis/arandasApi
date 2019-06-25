'use strict'

var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
// routers

module.exports = function (app) {
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

    //headers
    app.use(allowCrossDomain);

    //routes
    router.get('/', (req, res)=> {
        res.send({message: 'welcome'})
    } );
    //router.use('/', express.static( path.join(__dirname, '../../views/index.html')  ) );
     

}

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