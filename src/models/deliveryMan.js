'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var deliveryManSchema = new Schema({
    vehiculeType: { type: String },
    model: { type: String },
    modelYear: { type: String },
    matricule: { type: String },
    driverLicense: { type: String },
    typeLicense: { type: String },
    attachDocument: { type: String },
    account: { type: Schema.ObjectId, ref: 'accounts' }
});


module.exports = mongoose.model('deliveryMan', deliveryManSchema);