'use strict'

var logger = require('./logger');
var nconf = require('nconf');
var Chance = require('chance');
var path = require('path');
var fs = require('fs');
var ws = require('./src/webservice');
var db = require('./src/database');

//nconf.argv().env().file({file: 'config.json'});

var configFile = path.join(__dirname,'/config.json');
if( nconf.get('config') ) {
    configFile = path.resolve(__dirname, nconf.get('config'));
}


//Call the method Chance
var chance = new Chance();

console.log('°        °  °°°°°°°°  °        °°°°°°°°°°°°  °°°°°°°°°°°°  °°      °° °°°°°°°°°°');
console.log('°        °  °         °        °             °          °  ° °    ° ° °');
console.log('°        °  °         °        °             °          °  °  °  °  ° °');
console.log('°   °°   °  °°°°°°    °        °             °          °  °   °°   ° °°°°°°°');
console.log('°  °  °  °  °         °        °             °          °  °        ° °');
console.log('° °    ° °  °         °        °             °          °  °        ° °');
console.log('°°      °°  °°°°°°°°  °°°°°°°  °°°°°°°°°°°°  °°°°°°°°°°°°  °        ° °°°°°°°°°°');


  

//start the server

function start() {  

    db.initDB( (err , db) => {
        if(err) {
            logger.warn('Cant\'t to connect to MongoDB '+ err);
        } else {
            ws.listen( function() { 
               logger.info('server initiated');
            });
        }
    })
}

start();