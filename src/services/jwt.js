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

    return jwt.encode(payload, '74158f461a67f3e393b8dc4a68b40d79353e2c290ceb493dc3ab79c2bf10f070ce8c9b82');
}

