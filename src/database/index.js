'use strict'

var nconf = require('nconf');
var mongoose = require('mongoose');
var logger = require('../../logger');
var fs = require('fs');
var path  = require('path');
mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)

var configData;
fs.readFileSync('./config.json', (err, data)=> {
    if(err) throw err
    configData = JSON.parse(data);    
    console.log(configData);
});

var mongoconnections = {
    server: 'localhost',
    port: nconf.get('mongo:port') || 27017,
    username: nconf.get('mongo:username') || '',
    password: nconf.get('mongo:password') || '',
    database: nconf.get('mongo:database') || 'arandasApi',
    shard: false
}

var mongo_uri = ''; 

if( !mongoconnections.username ) {
    mongo_uri = `mongodb://${mongoconnections.server}:${mongoconnections.port}/${mongoconnections.database}`;
    if( mongoconnections.shard ) {
        mongo_uri = `mongodb+srv://${mongoconnections.server}/${mongoconnections.database}`;
    }
} else {
    mongoconnections.password = encodeURIComponent(mongoconnections.password);
    if( mongoconnections.shard ) {
        mongo_uri = `mongodb+srv://${mongoconnections.username}:${mongoconnections.password}@${mongoconnections.server}/${mongoconnections.database}`;
    } else {
        mongo_uri = `mongodb://${mongoconnections.username}:${mongoconnections.password}@${mongoconnections.server}:${mongoconnections.port}/${mongoconnections.database}`;
    }
}

if ( process.env.TD_MONGODB_URI ) mongo_uri= process.env.TD_MONGODB_URI; 

var options = {
    keepAlive: 1,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useCreateIndex: true
}

function initDB(callback) {
    //console.log(mongo_uri);
    mongoose.connect(mongo_uri,options)
    .then( (db)=> {
        logger.info('CONNECTED TO MONGODB');
        mongoose.connection.db.admin().command({ buildInfo: 1 }, (err, info)=> {
            if (err) logger.warn(err);
            return callback(null, db)
        });
        
    } )
    .catch( (err)=> {
        return callback(err, null)
    } );
}
module.exports = { initDB }