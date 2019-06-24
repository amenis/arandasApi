'use strict'

var nconf = require('nconf');
var mongoose = require('mongoose');
var winston = require('winston');

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


var MONGO_URI = '';

if( !MONGOCONNECTIONS.username && !MONGOCONNECTIONS.password ) {
    MONGO_URI = 'mongodb://' + 
    MONGOCONNECTIONS.server + 
    ':' + 
    MONGOCONNECTIONS.port +
     '/' + 
    MONGOCONNECTIONS.database;    
} else {
    MONGO_URI = 'mongodb://' + 
    MONGOCONNECTIONS.username + 
    ':' + 
    MONGOCONNECTIONS.password + 
    '@' + 
    MONGOCONNECTIONS.server + 
    '/' 
    +MONGOCONNECTIONS.database;
}
 
var options = {
    keepAlive: 1,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useCreateIndex: true
}

module.exports.initDB = (callback) => {
    console.log(db.connections);
    mongoose.connect(MONGO_URI, options)    
    .then( () => {
        winston.info('MONGODB IS CONNECTED');
        return callback(null, db);
    })
    .catch( err => {
        winston.warn(err);
        return callback(err, null);
    });
}