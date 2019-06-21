'use strict'


var winston = require('winston');
var nconf = require('nconf');
var Chance = require('chance');
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 3000;

global.env = process.env.NODE_ENV || 'production';
var chance = new Chance();
//create log levels
winston.remove(winston.transports.Console);

var sysLogger = winston.createLogger({
    levels: winston.config.cli.levels,
    format: winston.format.timestamp(),
    transports: [        
        new winston.transports.Console(),
        new winston.transports.File({filename: '/logs/error.log', level:'error'})
    ]
});

winston.info('|        |  ||||||||  |        ||||||||||||  ||||||||||||  ||      || ||||||||||');
winston.info('|        |  |         |        |             |          |  | |    | | |');
winston.info('|        |  |         |        |             |          |  |  |  |  | |');
winston.info('|   ||   |  ||||||    |        |             |          |  |   ||   | |||||||');
winston.info('|  |  |  |  |         |        |             |          |  |        | |');
winston.info('| |    | |  |         |        |             |          |  |        | |');
winston.info('||      ||  ||||||||  |||||||  ||||||||||||  ||||||||||||  |        | ||||||||||');

var configFile = path.join(__dirname, '/config.json');
var configExist;

nconf.defaults({
    base_dir: __dirname,
    tokens: {
        secret: chance.hash() +chance.md5(),
        expires: 900
    }
});

if( nconf.get('config') ) {
    configFile = path.resolve(__dirname, nconf.get('config'));
} 

configExist = fs.existsSync(configFile);



app.listen(port, () => {
    console.log('THE SERVER IS RUNNING ON PORT ', port);
    //console.log(nconf.get('tokens'));
   
});

