'use strict'

var jwt = require('../services/jwt');
var bcrypt = require('bcrypt-nodejs');
var Accounts = require('../models/accounts');
var logger = require('../../logger');

var prueba = (req, res) => {
    res.status(200).send({message: 'Testing User Controller' });
}

var saveAccount = (req, res)=> {
    var accounts = new Accounts();
    var params = req.body;
    //save user data into UserModel
   accounts.name = params.name;
   accounts.surname = params.surname;
   accounts.birthdate = params.birthdate;
   accounts.email = params.email;
   accounts.role = params.role;
   accounts.username = params.username;

    bcrypt.hash(params.password,null,null, (err, hash) => {
        if(err) logger.error(err.message);
        //save the hash into the user.passsword
        accounts.password = hash;
           
        accounts.save( (err, storedAccount) => {
            if(err) {
                logger.warn(err);
                if(err.code = 11000) {
                    res.status(500).send({message: 'El usuario ya ah sido registrado anteriormente'});
                } else {
                    res.status(500).send({message: err});
                }
            } else {
                if(!storedAccount) {
                    logger.info('User Error');
                    res.status(404).send({message: 'Error al registar el usuario '});
                } else {
                    res.status(200).send({storedAccount});
                }
            }
        });            
    }); 
}

module.exports = {
    prueba,
    saveAccount
}