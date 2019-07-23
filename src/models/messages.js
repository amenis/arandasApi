'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    messageDate: { type: Date },
    from: { type: Schema.ObjectId, ref: 'accounts' },
    to: { type: Schema.ObjectId, ref: 'accounts' },
    message: { type: String },
    attach: { type: String }
});

module.exports = mongoose.model('message', MessageSchema);