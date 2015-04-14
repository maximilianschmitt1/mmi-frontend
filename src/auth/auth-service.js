'use strict';

var authService = function($http, API_URL, authRegistry) {
  var token, user;

  return {
    login: function(credentials) {
      return $http
        .post(API_URL + '/auth/authenticate', credentials)
        .then(function(res) {
          authRegistry.token(res.data.authToken);
          return $http.get(API_URL + '/auth/identify');
        })
        .then(function(res) {
          authRegistry.user(res.data.user);
        });
    },
    logout: function() {
      token = null;
      user = null;

      authRegistry.unset();
    }
  };
};

module.exports = authService;