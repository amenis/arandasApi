'use strict'

var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name: { type: String },
    surname: { type: String },
    birthdate: { type: Date },
    registerDate: { type: Date },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        /*validate: (value) => {
          return validator.isEmail(value);
        }*/
    },
    role: { type: String },
    avatar: { type: String },
    username: { 
        type: String,
       /* validate: (value) => {
            return validator.isEmpty(value);
        }*/
    },
    password: { 
        type: String,
        /*validate: (value) => {
            return validator.isEmpty(value);
        } */
    }
});

module.exports = mongoose.model('accounts', userSchema);