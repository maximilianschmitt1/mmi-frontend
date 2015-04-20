'use strict';

var authService = function($http, API_URL, authRegistry, $rootScope) {
  var token, user;

  return {
    login: function(credentials) {
      return $http
        .post(API_URL + '/auth/authenticate', credentials)
        .then(function(res) {
          authRegistry.token(res.data.authToken);
          authRegistry.user(res.data.user);
          $rootScope.$broadcast('login');
        });
    },
    logout: function() {
      token = null;
      user = null;

      authRegistry.unset();
      $rootScope.$broadcast('logout');
    }
  };
};

module.exports = authService;