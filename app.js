'use strict'


var logger = require('./logger');
var nconf = require('nconf');
var Chance = require('chance');
var path = require('path');
var fs = require('fs');
var ws = require('./src/webservice');
var db = require('./src/database');
nconf.argv()
.env()
.file({ file: './config.json' });

//Call the method Chance
var chance = new Chance();

nconf.defaults({
    base_dir: __dirname,
    tokens: {
        secret: chance.hash() + chance.md5(),
        expired: 900
    }
});


console.log('|        |  ||||||||  |        ||||||||||||  ||||||||||||  ||      || ||||||||||');
console.log('|        |  |         |        |             |          |  | |    | | |');
console.log('|        |  |         |        |             |          |  |  |  |  | |');
console.log('|   ||   |  ||||||    |        |             |          |  |   ||   | |||||||');
console.log('|  |  |  |  |         |        |             |          |  |        | |');
console.log('| |    | |  |         |        |             |          |  |        | |');
console.log('||      ||  ||||||||  |||||||  ||||||||||||  ||||||||||||  |        | ||||||||||');

//start the server
ws.listen( function() { 
    if(err) logger.error(err);
    else logger.info(db);
});

db.initDB( (err , db) => {
    if(err) {
        logger.warn('Cant\'t to connect to MongoDB '+ err);
    } else {
       
    }
})