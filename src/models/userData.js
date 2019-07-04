'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserDataSchema = new Schema({
    phoneNumber:  { type: number },
    phoneLada: { type: Number },
    adress: { type: String },
    numAdress: { type: String },
    city: { type: String },
    state: { type: String },
    account: { type: Schema.ObjectId, ref: 'accounts' }
});

module.exports = mongoose.model('userData', UserDataSchema);