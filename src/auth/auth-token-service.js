'use strict';

var authTokenService = function() {
  return {
    set: function(token) {
      localStorage.setItem('authToken', token);
    },
    delete: function() {
      localStorage.removeItem('authToken');
    },
    get: function() {
      return localStorage.getItem('authToken');
    },
    tokenExists: function() {
      return !!localStorage.getItem('authToken');
    }
  };
};

module.exports = authTokenService;