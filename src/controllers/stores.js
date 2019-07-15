'use strict'

var logger = require('../../logger');
var Stores = require('../models/stores');
var Products = require('../models/products');
var validator = require('validator');
var _ = require('lodash');

var storesController = {};


storesController.newStore = (req, res) => {
    var params = req.body
    var validate_productName = !validator.isEmpty(params.name);
    var validate_lat = !validator.isEmpty(params.lat);
    var validate_long = !validator.isEmpty(params.long);

    if(validate_productName && validate_lat && validate_long){
        var store = new Stores();
   
        //res.status(200).send(req.body)
        store.name = params.name;
        store.description = params.description;
        store.street = params.street;
        store.streetNumber = params.streetNumber;
        store.lat = params.lat;
        store.long = params.long;
        
        store.save( (err, saveStore ) => {
            if(err) {
                logger.warn( err._message + ' '+ Date('yyyy-mm-dd hh:mm:ss') );
                res.status(500).send({message: err });            
            } else {
                if(!saveStore) {
                    res.status(404).send({message:'Error al guardar los datos favor de intentarlo de nuevo' });
                } else {
                    res.status(200).send({store: saveStore});
                }
            } 
    
        });
    }    
    
}


storesController.addNewProduct = (req, res) => {
    var postData = req.body;
    var product = new Products(postData);
    
    if( !_.isUndefined(postData.store) ) {
        product.store = postData.store;
    } else {
        req.status(400).send({message: 'No existe ninguna tienda asociada al producto' });
    }
  
    product.save( (err, p) => {
        if(err) {
            logger.warn(err);
            res.status(400).send({message: err});
        }
        if( !p ) {
            res.status(500).send({message: 'No ha sido posible guardar el producto'});
        } else {
            res.status(200).send({product:p});
        }
    } );

}


module.exports = storesController;