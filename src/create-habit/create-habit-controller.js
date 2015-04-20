'use strict';

var CreateHabitController = function($scope, API_URL, $http) {
  var habitDefaults = {
    name: '',
    duration: 66
  };

  $scope.habit = habitDefaults;

  $scope.createHabit = function(habit) {
    $http
      .post(API_URL + '/habits', habit)
      .then(function(res) {
        $scope.success = true;
        $scope.habit = habitDefaults;
      });
  };
};

module.exports = CreateHabitController;