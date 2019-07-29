'use strict'

var logger = require('../../logger');
var _ = require('lodash');
var validator = require('validator');
var kardexModel = require('../models/kardex');
var storeModel = require('../models/stores');

var orders = {};

orders.createOrder = (req, res) => {
    //we get the data from the user request
    var postData = req.body;   
    var kardex = new kardexModel(postData);
           
    //validate if the id's if store as user are correct
    var validatorStore = !validator.isAlpha(postData.store);
    var validatorUser = !validator.isAlpha( postData.user);
    
    if(validatorStore && validatorUser) {
        
        kardex.userAccount = postData.user;
        kardex.comment = postData.comments;
        kardex.status = 'order:open';
        
        postData.shoppingCart.map( (obj) => {
            //validate the cart from the request
            var validateProduct = !validator.isAlpha(obj.product);
            var validateQuantity = !validator.isInt(obj.quantity);

            if ( validateProduct && validateQuantity ){
                kardex.shoppingCart = postData.shoppingCart 
            }

        });  
        
        //store the order in kardex 
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


orders.seeOrders = (req, res) => {
    
    var validatorStore = !validator.isAlpha(req.body.store);
    var validatorUser = !validator.isAlpha( req.body.user);
    
    if ( validatorStore && validatorUser ) {
        
        storeModel.find({ $and: [ {_id: req.body.store }, { userRegister: req.body.user } ] }, function(err, s) {
            res.send(s);
        });

    } else {
        res.status(500).send( {message: 'Los datos del usuario no son correctos'} );
    }
}

module.exports = orders;