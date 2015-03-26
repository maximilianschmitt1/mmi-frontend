'use strict';

var LoginController = function($scope, $http, API_URL) {
  $scope.login = function(credentials) {
    $http
      .post(API_URL + '/auth/authenticate', credentials)
      .then(function(res) {
        var response = res.data;

        if (response.error) {
          console.log(response.error.message);
          return;
        }

        console.log(response);
      });
  };
};

module.exports = LoginController;