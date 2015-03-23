'use strict';

var habitListController = function($scope, $mdDialog) {
  $scope.showNewHabitDialog = function(e) {
    console.log($mdDialog);
    $mdDialog
      .show({
        controller: dialogController,
        templateUrl: 'views/new-habit-dialog.html',
        targetEvent: e,
      })
      .then(function() {
        console.log('ok');
      }, function() {
        console.log('cancel');
      });

    function dialogController($scope, $mdDialog) {
      $scope.habit = {
        name: '',
        duration: 66
      };

      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }
  };
};

module.exports = habitListController;