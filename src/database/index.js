'use strict'

var nconf = require('nconf');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

var db = {};


var MONGOCONNECTIONS = {
    server: process.env.TD_MONGODB_SERVER || nconf.get('mongo:host'),
    port: process.env.TD_MONGODB_PORT || nconf.get('mongo:port') || '27017',
    username: process.env.TD_MONGODB_USERNAME || nconf.get('mongo:username'),
    password: process.env.TD_MONGODB_PASSWORD || nconf.get('mongo:password'),
    database: process.env.TD_MONGODB_DATABASE || nconf.get('mongo:database'), 
};




