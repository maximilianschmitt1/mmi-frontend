'use strict';

var authRegistry = function($rootScope) {
  var token, user;

  return {
    user: function(value) {
      if (value) {
        user = value;
        localStorage.setItem('auth-user', user);
        $rootScope.user = user;
      }

      return user;
    },
    token: function(value) {
      if (value) {
        token = value;
        localStorage.setItem('auth-token', token);
      }

      return token;
    },
    unset: function() {
      user = null;
      token = null;
      $rootScope.user = null;

      localStorage.removeItem('auth-user');
      localStorage.removeItem('auth-token');
    },
    config: function() {
      user = localStorage.getItem('auth-user') || null;
      token = localStorage.getItem('auth-token') || null;
    }
  };
};

module.exports = authRegistry;