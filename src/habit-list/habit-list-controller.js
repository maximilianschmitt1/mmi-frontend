'use strict';

var HabitListController = function($scope, $http, API_URL) {
  $scope.habits = [];

  getHabits();

  $scope.showNewHabitDialog = function(e) {
    console.log('show new dialog');
    return;
    $mdDialog.show({
      controller: newHabitDialogController,
      templateUrl: 'habit-list/new-habit-dialog.html',
      targetEvent: e
    });

    function newHabitDialogController($scope, $mdDialog, $http, API_URL) {
      $scope.habit = {
        name: '',
        duration: 66
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.create = function(habit) {
        return $http
          .post(API_URL + '/habits', habit)
          .then(function(res) {
            $mdDialog.hide(habit);
            return getHabits();
          });
      };
    }
  };

  function getHabits() {
    return $http
      .get(API_URL + '/habits')
      .then(function(res) {
        var habits = res.data.habits;
        habits.forEach(function(habit) {
          habit.level = Math.ceil(Math.random() * 10);
        });

        $scope.habits = res.data.habits;
      });
  }
};

module.exports = HabitListController;