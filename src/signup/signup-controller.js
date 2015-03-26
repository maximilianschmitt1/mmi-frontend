'use strict';

var SignupController = function($scope) {
  $scope.signup = function(userData) {
    console.log(userData);
  };
};

module.exports = SignupController;