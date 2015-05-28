'use strict';

var LoginController = /*@ngInject*/ function($scope, authService) {
  $scope.login = function(credentials) {
    authService
      .login(credentials)
      .then(function() {
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
