'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    status: { type: String },
    store: { type: Schema.ObjectId, ref: 'stores' }
});

module.exports = mongoose.model('products', ProductsSchema);