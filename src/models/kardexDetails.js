'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KardexDetailSchema = new Schema({
    deliveryMan: { type: Schema.ObjectId, ref: 'deliveryMan' },
    takenDate: { type: Date },
    deliveryDate: { type: Date },
    lat: { type: String },
    long: { type: String },
});

module.exports = mongoose.model('kardexDetails', KardexDetailSchema);
