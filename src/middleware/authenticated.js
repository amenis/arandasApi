'use strict'

var logger = require('../../logger');
var nconf = require('nconf');
var jwt = require('jwt-simple');
var moment = require('moment');


exports.authenticated = (req, res, next) => {

    //verify if exist the headers with the token
    if(!req.headers,this.authorization) {
        logger.warn(req.username + moment().format('MM/DD/YYYY, hh:mm:ss ' + 'Access Denied') );
        return res.status(404).send({message: 'Acceso denegado'});        
    }

    //extract the quots from the headers
    var token = req.headers.authorization.replace(/['"]+/g, '' );
    //decode token
    var payload = jwt.decode(token,'74158f461a67f3e393b8dc4a68b40d79353e2c290ceb493dc3ab79c2bf10f070ce8c9b82');

    try {
        //verify if the token doen't expired
        if( payload.exp <= moment().unix()){
            logger.warn(req.username + moment().format('MM/DD/YYYY, hh:mm:ss ' + 'Expired Token') );
            return res.status(404).send({message: 'Token Expirado'});
        }
    } catch (err) {
        logger.err(req.username + moment().format('MM/DD/YYYY, hh:mm:ss ' + err) );
        return res.status(500).send({message: 'token invalido'});
    }

    //transfer the action to the next action
    next();
}