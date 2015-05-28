'use strict';

var levelIndicator = /*@ngInject*/ function($timeout) {
  return {
    template: '{{level}}',
    link: function(scope, el, attrs) {
      scope.$watch('habit', animateLevel);

      function animateLevel() {
        var habit = scope.habit;

        if (habit.levelChanged) {
          scope.level = habit._before.level.value;
          $timeout(setLevel, 1000);
        } else {
          setLevel();
        }
      }


      function setLevel() {
        scope.level = scope.habit.level.value;
      }
    }
  };
};

module.exports = levelIndicator;
