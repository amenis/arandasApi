'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    street: { type: String, required: true },
    streetNumber: { type: String },
    registerTimeData: { type: Date, default: Date.now },
    userRegister: { type: Schema.ObjectId, ref: 'accounts'},
    lat: { type: String, required: true },
    long: { type: String, required: true }
});

module.exports = mongoose.model('stores', storeSchema);