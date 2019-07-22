'use strict'

var logger = require('../../logger');
var _ = require('lodash');
var validator = require('validator');
var kardex = require('../models/kardex');

var orders = {};

orders.createOrder = (req, res) => {
    //we get the data from the user request
    var postData = req.body;   

    if( !_.isObject(postData) || !_.isNull(req.body._id) ) {
        res.status(400).send({ message: 'Datos invalidos' });
    } 

    var validatorStore = !validator.isEmpty(postData.store);
    var validatorProduct = !validator.isEmpty(postData.product);
    var validatorQuantity = !validator.isEmpty(postData.quantity) ? validator.isInt(postData.quantity) : false; 
    
    
    if(validatorStore && validatorProduct && validatorQuantity) {
        

    } else {
        res.status(404).send({ message: 'Los datos no se registraron correctamente' });
    }

}




moduele.export = () => {
    orders
}