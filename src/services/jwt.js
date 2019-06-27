'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var nconf = require('nconf');

exports.createToken = (user) => {
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix
    }

    return jwt.encode(payload, nconf.get('tokens:secret'));
}

