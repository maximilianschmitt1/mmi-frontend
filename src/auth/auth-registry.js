'use strict';

var authRegistry = /*@ngInject*/ function($rootScope) {
  var token, user;

  return {
    user: function(value) {
      if (value) {
        user = value;
        localStorage.setItem('auth-user', JSON.stringify(user));
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
      try {
        this.user(JSON.parse(localStorage.getItem('auth-user')) || null);
      } catch (err) {
        localStorage.removeItem('auth-user');
      }

      this.token(localStorage.getItem('auth-token') || null);
    }
  };
};

module.exports = authRegistry;
