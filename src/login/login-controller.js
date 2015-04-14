'use strict';

var LoginController = function($scope, authService) {
  $scope.login = function(credentials) {
    authService
      .login(credentials)
      .then(function(res) {
        $scope.success = true;
        $scope.error = false;
      })
      .catch(function(res) {
        $scope.success = false;
        $scope.error = res.data.error;
      });
  };
};

module.exports = LoginController;