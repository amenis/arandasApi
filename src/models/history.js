'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HistorySchema = new Schema({
    deliveryMan: { type: Schema.ObjectId, ref: 'deliveryMan' },
    takenDate: { type: Date },
    deliveryDate: { type: Date },
    lat: { type: String },
    long: { type: String },
});

module.exports = mongoose.model('history', HistorySchema);
