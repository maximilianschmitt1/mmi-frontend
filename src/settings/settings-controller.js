'use strict';

var SettingsController = /*@ngInject*/ function($scope, $rootScope, $http, API_URL, authRegistry) {
  $scope.settings = {
    remind: !!$rootScope.user.remind
  };

  $scope.update = function(settings) {
    $scope.success = false;
    $scope.error = false;

    $http
      .put(API_URL + '/users', settings)
      .then(function(res) {
        authRegistry.user(res.data.user);
        $scope.success = true;
        $scope.error = false;
      })
      .catch(function(res) {
        $scope.success = false;
        $scope.error = res.data.error;
      });
  };
};

module.exports = SettingsController;
