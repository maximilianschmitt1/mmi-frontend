'use strict';

var HabitListController = function($scope, habitStore) {
  $scope.habits = [];

  $scope.allCollapsed = function() {
    return !$scope.detailedHabit;
  };

  $scope.toggleDetails = function(habit) {
    $scope.detailedHabit = $scope.detailedHabit === habit ? null : habit;
  };

  $scope.isToggled = function(habit) {
    return $scope.detailedHabit ? $scope.detailedHabit._id === habit._id : false;
  };

  $scope.untoggle = function(habit) {
    if ($scope.detailedHabit && $scope.detailedHabit._id === habit._id) {
      $scope.detailedHabit = null;
    }
  };

  $scope.reload = function() {
    habitStore.list().then(function(habits) {
      $scope.detailedHabit = habits[0];
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