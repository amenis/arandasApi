'use strict'


var winston = require('winston');
var nconf = require('nconf');
var Chance = require('chance');
var path = require('path');
var fs = require('fs');
var ws = require('./src/webservice');


//Node Enviroment status
global.env = process.env.NODE_ENV || 'production';

//Call the method Chance
var chance = new Chance();

//create log levels
winston.remove(winston.transports.Console);

//Create the logger
var sysLogger = winston.createLogger({
    levels: winston.config.cli.levels,
    format: winston.format.timestamp(),
    transports: [        
        new winston.transports.Console(),
        new winston.transports.File({filename: './logs/error.log', level:'error'})
    ]
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