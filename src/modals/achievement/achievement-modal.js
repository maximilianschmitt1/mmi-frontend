'use strict';

var AchievementModal = function($scope, habit, achievement, close) {
  $scope.habit = habit;
  $scope.achievement = achievement;
  $scope.close = close;
};

module.exports = AchievementModal;