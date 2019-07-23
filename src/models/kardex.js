'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KardexSchema = new Schema({
    product: { type: Schema.ObjectId, ref: 'products' },
    quantity: { type: number },
    unitPrice: { type: number },
    date: { type: Date },
    useAccount: { type: Schema.ObjectId, ref: 'accounts' },
    status: { type: Boolean}
});


module.exports = mongoose.model('kardex', KardexSchema);