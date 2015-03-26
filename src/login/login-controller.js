'use strict';

var LoginController = function($scope, $http, API_URL, authTokenService, $rootScope) {
  $scope.login = function(credentials) {
    $http
      .post(API_URL + '/auth/authenticate', credentials)
      .then(function(res) {
        authTokenService.set(res.data.authToken);
        $scope.success = true;
        $scope.error = false;

        return $http.get(API_URL + '/auth/identify');
      })
      .then(function(res) {
        var user = res.data.user;
        $rootScope.user = user;
      })
      .catch(function(res) {
        $scope.success = false;
        $scope.error = res.data.error;
      });
  };
};

module.exports = LoginController;