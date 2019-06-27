'use strict'

var jwt = require('../services/jwt');
var bcrypt = require('bcrypt-nodejs');
var Accounts = require('../models/accounts');
var logger = require('../../logger');

var prueba = (req, res) => {
    res.status(200).send({message: 'Testing User Controller' });
}

var saveUser = (req, res)=> {
    var accounts = new Accounts();
    var params = req.body;
    //save user data into UserModel
   accounts.name = params.name;
   accounts.surname = params.surname;
   accounts.email = params.email;
   accounts.role = params.role;
   accounts.username = params.username;

    bcrypt.hash(params.password,null,null, (err, hash) => {
        if(err) logger.error(err.message);
        //save the hash into the user.passsword
        accounts.password = hash;
           
        accounts.save()
            .then( userStored=> {
                res.status(200).send({userStored});
            })
            .catch( err => {
                logger.warn(err)
                res.send(err)
            } );
        
    }); 
}

module.exports = {
    prueba,
    saveUser
}