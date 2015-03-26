'use strict';

var LoginController = function($scope) {
  $scope.login = function(credentials) {
    console.log(credentials);
  };
};

module.exports = LoginController;