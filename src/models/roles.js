'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
    name: { type: String },
    description: { type: String },
    grants: [{ type: String }],
    normalize: { type: String }
});

roleSchema.statics.getRoleByName = function (name, callback) {
    var q = this.model('roles').findOne({ normalized: new RegExp('^' + name.trim() + '$', 'i') })
    return q.exec(callback)
};


module.exports = mongoose.model('roles', roleSchema);