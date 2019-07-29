'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var COLLECTION = 'roles';

var roleSchema = new Schema({
    name: { type: String },
    description: { type: String },
    grants: [{ type: String }],
    normalize: { type: String }
});

roleSchema.statics.getRoleByName = function (name, callback) {
    var q = this.model(COLLECTION).findOne({ name: name })
    return q.exec(callback)
};

roleSchema.statics.getRoles = function (callback) {
    return this.model(COLLECTION)
      .find({})
      .exec(callback)
}
  
module.exports = mongoose.model(COLLECTION, roleSchema, COLLECTION);