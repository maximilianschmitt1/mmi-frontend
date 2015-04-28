'use strict';

var levelIndicator = function($timeout) {
  return {
    template: '{{level}}',
    link: function(scope, el, attrs) {
      var habit = scope.habit;

      if (habit.levelledUp) {
        scope.level = habit._before.level.value;
        $timeout(setLevel, 1000);
      } else {
        setLevel();
      }

      function setLevel() {
        scope.level = habit.level.value;
      }
    }
  };
};

module.exports = levelIndicator;