'use strict';

var AchievementModal = function($scope, habit, achievement, close) {
  achievement.seen = true;

  $scope.habit = habit;
  $scope.achievement = achievement;
  $scope.close = close;
};

module.exports = AchievementModal;