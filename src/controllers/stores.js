'use strict'

var logger = require('../../logger');
var Stores = require('../models/stores');
//var validator = require('validator');

var storesController = {};


storesController.newStore = (req, res) => {
    var store = new Stores();
    var params = req.body
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

module.exports = storesController;