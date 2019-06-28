'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');

roles.admin = { 
    name: "Admin", 
    description: "", 
    resource : [ 
     { 
      id : '', 
      permissions: ['create', 'read', 'update', 'delete'] 
     }, 
     { 
      id : '', 
      permissions: ['create', 'read', 'update', 'delete'] 
     }, 
     { 
      id : '', 
      permissions: ['create', 'read', 'update', 'delete'] 
     }, 

    ] 
}; 

roles.seller = { 
  
    name: "seller", 
    description: "", 
    resource : [ 
     { 
      id : '', 
      permissions: ['create', 'read', 'update', 'delete'] 
     }, 
     { 
      id : '', 
      permissions: ['read'] 
     }, 
     { 
      id : '', 
      permissions: ['create', 'read', 'update'] 
     }, 

    ] 
};

roles.user = {
   
    name: "user", 
    description: "", 
    resource : [ 
     { 
      id : '', 
      permissions: ['create', 'read', 'update', 'delete'] 
     }, 
     { 
      id : '', 
      permissions: ['read'] 
     }, 
     { 
      id : '', 
      permissions: ['create', 'read', 'update'] 
     }, 

    ] 
}

var roleSchema = new Schema({
    name: { type: String },
    description: { type: String },
    resource: [{ type: String }],

});


async.parallel([
    
    function done(done) {
        roleSchema.create();
    }
]);