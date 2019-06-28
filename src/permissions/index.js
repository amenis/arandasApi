'use strict'

var permissions = (function() { 

    var getRoles = function (role) { 

    var rolesArr = []; 

    if (typeof role === 'object' && Array.isArray(role)) { 

     // Returns selected roles 
     for (var i = 0, len = role.length; i < len; i++) { 
      rolesArr.push(roles[role[i]]); 
     }; 
     return rolesArr; 

    } else if (typeof role === 'string' || !role) { 

     // Returns all roles 
     if (!role) { 
      for (var role in roles) { 
       rolesArr.push(roles[role]); 
      }; 
     } 

     // Returns single role 
     rolesArr.push(roles[role]); 
     return rolesArr; 

    } 

}, 
check = function (action, resource, loginRequired) { 

    return function(req, res, next) { 

     var isAuth = req.isAuthenticated(); 

     // If user is required to be logged in & isn't 
     if (loginRequired && !isAuth) { 
      return next(new Error("You must be logged in to view this area")); 
     } 

     if (isAuth || !loginRequired) { 

      var authRole = isAuth ? req.user.role : 'user', 
       role = get(authRole), 
       hasPermission = false; 

      (function() { 
       for (var i = 0, len = role[0].resource.length; i < len; i++){ 
        if (role[0].resource[i].id === resource && role[0].resource[i].permissions.indexOf(action) !== -1) { 
         hasPermission = true; 
         return; 
        } 
       }; 
      })(); 

      if (hasPermission) { 
       next(); 
      } else { 
       return next(new Error("You are trying to " + action + " a " + resource + " and do not have the correct permissions.")); 
      } 

     } 
    } 
} 

return { 
    get : function (role) { 

     var roles = getRoles(role); 

     return roles; 
    }, 
    check : function (action, resource, loginRequired) { 
     return check(action, resource, loginRequired); 
    } 
} 

})(); 

module.exports = permissions; 