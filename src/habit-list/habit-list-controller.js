'use strict';

var HabitListController = function($scope, habitStore) {
  $scope.habits = [];

  $scope.toggleDetails = function(habit) {
    $scope.detailedHabit = $scope.detailedHabit === habit ? null : habit;
  };

  $scope.isToggled = function(habit) {
    return $scope.detailedHabit ? $scope.detailedHabit._id === habit._id : false;
  };

  $scope.reload = function() {
    habitStore.list().then(function(habits) {
      $scope.habits = habits;
    });
  };

  $scope.showCreateHabitForm = function() {
    $scope.createHabit = true;
  };

  $scope.hideCreateHabitForm = function() {
    $scope.createHabit = false;
  };

  $scope.reload();
};

module.exports = HabitListController;