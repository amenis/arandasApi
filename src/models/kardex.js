'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var validator = require('validator');

var KardexSchema = new Schema({
    store: { type: Schema.ObjectId, ref: 'stores' },
    shoppingCart:[{
        product: {type: Schema.ObjectId, ref: 'products'} ,
        quantity: Number           
    }],
    date: { type: String, default: moment().format('MM/DD/YYYY,  h:mm:ss ') },
    userAccount: { type: Schema.ObjectId, ref: 'accounts' },
    comments: { type: String },
    status: { type: String}
});


module.exports = mongoose.model('kardex', KardexSchema, 'kardex');