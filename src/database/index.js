'use strict'

var nconf = require('nconf');
var mongoose = require('mongoose');
var logger = require('../../logger');
var fs = require('fs');
var path  = require('path');
var db = {};

var MONGOCONNECTIONS = {
    server: nconf.get('mongo:host') || 'localhost',
    port: nconf.get('mongo:port') || '27017',
    username: nconf.get('mongo:username'),
    password: nconf.get('mongo:password'),
    database: nconf.get('mongo:database') || 'arandasApi', 
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
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);

    mongoose.connect(MONGO_URI,options)
    .then( ()=> {
        if (!process.env.FORK) {
            logger.info('Connected to MongoDB')
        }
    
        db.connection = mongoose.connection
        mongoose.connection.db.admin().command({ buildInfo: 1 }, function (err, info) {
        if (err) logger.warn(err.message)
            db.version = info.version
            return callback(null, db)
        })
    } )
    .catch(err=> {
        logger.error(err.message);
        return callback(err,null);
    });
}