'use strict';

var SignupController = /*@ngInject*/ function($scope, $http, API_URL) {
  $scope.signup = function(userData) {
    $http
      .post(API_URL + '/users', userData)
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

module.exports = SignupController;
