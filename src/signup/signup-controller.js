'use strict';

var SignupController = function($scope, $http, API_URL) {
  $scope.signup = function(userData) {
    $http
      .post(API_URL + '/users', userData)
      .then(function(res) {
        var response = res.data;

        if (response.error) {
          console.log(response.error);
          return;
        }

        console.log(response);
      });
  };
};

module.exports = SignupController;