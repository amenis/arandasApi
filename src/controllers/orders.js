'use strict'

var logger = require('../../logger');
var _ = require('lodash');
var validator = require('validator');
var kardexModel = require('../models/kardex');

var orders = {};

orders.createOrder = (req, res) => {
    //we get the data from the user request
    var postData = req.body;   
    var kardex = new kardexModel(postData);
           
    //validate data
    var validatorStore = !validator.isEmpty(postData.store);
    //var validatorProduct = !validator.isEmpty(postData.product);
    //var validatorQuantity = !validator.isEmpty(postData.quantity) ? validator.isInt(postData.quantity) : false; 
    
    
    if(validatorStore) {
        
        kardex.userAccount = postData.user;
        kardex.comment = postData.comments;
        kardex.status = 'order:open';
        kardex.shoppingCart = postData.shoppingCart  
        
        kardex.save( (err, orderSaved) => {
            if(err) {
                logger.warn(err);
                res.status(500).send({message: '!Ah ocurrido un error en el servidor'})
            } else {
                if(!orderSaved) {
                    res.status(400).send({message: 'No ha sido posible guardar los datos'});
                } else {
                    res.status(200).send(orderSaved);
                }
            }
        } );
        
    } else {
        res.status(404).send({ message: 'Los datos no se registraron correctamente' });
    }

}

module.exports = orders;