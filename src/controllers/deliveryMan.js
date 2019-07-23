'use strict'

var logger = require('../../logger');
var deliveryModel = require('../models/deliveryMan');
var _ = require('lodash');
var validator = require('validator');

var deliveryMan = {};

deliveryMan.newRegister = (req, res) => {
    var params = req.body;
    var register = new deliveryModel(params);

    register.save( (err, saved) => {
        if(err) {
            logger.warn(err);
            res.status(500).send({message: err});
        } else {
            if(!saved) {
                res.status(500).send({message: 'Error al guardar los datos'});
            } else {
                res.status(200).send({saved});
            }
        }
    });

}; 

deliveryMan.editDeliveryMan = (req, res) => {

}



module.exports = deliveryMan;