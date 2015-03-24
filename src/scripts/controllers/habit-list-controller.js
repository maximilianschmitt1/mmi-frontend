'use strict';

var HabitListController = function($scope, $mdDialog) {
  $scope.showNewHabitDialog = function(e) {
    $mdDialog
      .show({
        controller: newHabitDialogController,
        templateUrl: 'views/new-habit-dialog.html',
        targetEvent: e
      })
      .then(function(answer) {
        console.log('ok', answer);
      }, function() {
        console.log('cancel');
      });

    function newHabitDialogController($scope, $mdDialog) {
      $scope.habit = {
        name: '',
        duration: 66
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.create = function(answer) {
        $mdDialog.hide(answer);
      };
    }
  };
};

module.exports = HabitListController;