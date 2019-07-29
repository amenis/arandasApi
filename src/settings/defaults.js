'use strict'

var logger = require('../../logger');
var async = require('async');

var rolesDefault = {
    admin: {
        name: 'admin',
        description: 'administrador',
        grants: ['*']
    },
    sellers: {
        name: 'sellers',
        description: 'sellers',
        grants: [
            'user',
            'locations',
            'deliverMan',
            'products'
        ]
    },
    deliveryMan: {
        name: 'deliveryMan',
        description: 'delivery',
        grants: [
            'user',
            'locations',
            'seller'
        ]
    },
    user: {
        name: 'user',
        description: 'user',
        grants: [
            'deliverMan',
            'locations',
            'products',
            'stores'
        ]
    }
    
};

var createRolesByDefaut = (callback)=> {
    
    var rolesSchema = require('../models/roles');
    
    async.series([
    
        function(done){
            //create role admin            
            rolesSchema.getRoleByName('admin',(err, role)=> {
                if(err) logger.warn( done(err) )
                if(!role) {
                    rolesSchema.create({
                        name: rolesDefault.admin.name,
                        description: rolesDefault.admin.description,
                        grants: rolesDefault.admin.grants,
                        normalize: 'admin'
                    }, (err, roleCreated)=> {
                        if(err) {
                            logger.error(err);
                        } 
                         
                        done()                   
                    });
                }              
            });
            
        },
        function(done){
            //create role seller            
            rolesSchema.getRoleByName('seller',(err, role)=> {
                if(err) logger.warn( done(err) )
                if(!role) {
                    rolesSchema.create({
                        name: rolesDefault.sellers.name,
                        description: rolesDefault.sellers.description,
                        grants: rolesDefault.sellers.grants,
                        normalize: 'sellers'
                    }, (err, roleCreated)=> {
                        if(err) {
                            logger.error(err);
                        } 
                        
                        done()
                    });
                }              
            });
         
        },
        function(done){
            //create role deliveryMan            
            rolesSchema.getRoleByName('deliveryMan',(err, role)=> {
                if(err) logger.warn( done(err) )
                if(!role) {
                    rolesSchema.create({
                        name: rolesDefault.deliveryMan.name,
                        description: rolesDefault.deliveryMan.description,
                        grants: rolesDefault.deliveryMan.grants,
                        normalize: 'deliveryMan'
                    }, (err, roleCreated)=> {
                        if(err) {
                            logger.error(err);
                        } 
                       
                        done()
                    });
                }

                
            });
        },
        function(done){
            //create role user            
            rolesSchema.getRoleByName('user',(err, role)=> {
                if(err) logger.warn( done(err) )
                if(!role) {
                    rolesSchema.create({
                        name: rolesDefault.user.name,
                        description: rolesDefault.user.description,
                        grants: rolesDefault.user.grants,
                        normalize: 'user'
                    }, (err, roleCreated)=> {
                        if(err) {
                            logger.error(err);
                        } 
                        
                        done()
                    });
                }

               
            });
        }
    ], (err)=> {
        if(err) throw err
        createRolesByDefaut = null;
        return callback();        
    });   
    
}

module.exports = {
    createRolesByDefaut
}