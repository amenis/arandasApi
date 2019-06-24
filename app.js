'use strict'


var winston = require('winston');
var nconf = require('nconf');
var Chance = require('chance');
var path = require('path');
var fs = require('fs');
var ws = require('./src/webservice');
var db = require('./src/database');
nconf.argv().env().file( './config.json' );

//Node Enviroment status
global.env = process.env.NODE_ENV || 'production';

//Call the method Chance
var chance = new Chance();

//create log levels
winston.remove(winston.transports.Console);

//Create the logger
var sysLogger = winston.createLogger({
    levels: winston.config.cli.levels,
    format: winston.format.json,
    transports: [        
        new winston.transports.Console(),
        new winston.transports.File({filename: './logs/error.log'})
    ]
});


nconf.set({
    mongo: {
        host: '127.0.0.1',
        username: '',
        password: '',
        port: 27017
    }
});

nconf.defaults({
    base_dir: __dirname,
    tokens: {
       secret: chance.hash() + chance.md5(),
       expires: 900
    }
});


winston.info('|        |  ||||||||  |        ||||||||||||  ||||||||||||  ||      || ||||||||||');
winston.info('|        |  |         |        |             |          |  | |    | | |');
winston.info('|        |  |         |        |             |          |  |  |  |  | |');
winston.info('|   ||   |  ||||||    |        |             |          |  |   ||   | |||||||');
winston.info('|  |  |  |  |         |        |             |          |  |        | |');
winston.info('| |    | |  |         |        |             |          |  |        | |');
winston.info('||      ||  ||||||||  |||||||  ||||||||||||  ||||||||||||  |        | ||||||||||');



ws.listen( ()=> {   
    winston.info('webService is Ready');
} );

db.initDB( (err , db) => {
    if(err) {
        winston.warn('Cant\'t to connect to MongoDB '+ err);
    } else {
        winston.info(db);
    }
})