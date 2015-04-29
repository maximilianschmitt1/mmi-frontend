'use strict';

var find = require('array-find');

var HabitListController = function($scope, habitStore, ModalService) {
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

  $scope.delete = function(deleted) {
    if ($scope.detailedHabit && $scope.detailedHabit._id === deleted._id) {
      $scope.detailedHabit = null;
    }
  };

  $scope.reload = function() {
    $scope.loading = true;
    habitStore.list().then(function(habits) {
      $scope.loading = false;
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