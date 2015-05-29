'use strict';

var LevelUpModal = /*@ngInject*/ function($scope, $element, $timeout, habit, close) {
  $scope.habit = habit;
  $scope.close = close;
};

module.exports = LevelUpModal;
