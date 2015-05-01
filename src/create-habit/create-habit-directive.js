'use strict';

var angular = require('angular');
var bowser = require('bowser').browser;

var createHabitDirective = function(API_URL, $http) {
  return {
    restrict: 'E',
    templateUrl: !(bowser.mobile || bowser.tablet) ? '/create-habit/create-habit.html' : null,
    template: (bowser.mobile || bowser.tablet) ? '' : null,
    scope: {
      onCreate: '&',
      onCancel: '&'
    },
    link: function(scope, el, attrs) {
      var habitDefaults = {
        name: ''
      };

      scope.habit = {
        name: habitDefaults.name
      };

      scope.createHabit = createHabit;

      if (bowser.mobile || bowser.tablet) {
        var habit = { name: window.prompt('Was nimmst du dir vor? (z.B. Jeden Tag 2 Liter Wasser trinken)') };
        if (!habit.name) {
          scope.onCancel();
          return;
        }
        createHabit(habit);
      }

      function createHabit(habit) {
        $http
          .post(API_URL + '/habits', habit)
          .then(function(res) {
            scope.habit = {
              name: habitDefaults.name
            };

            scope.onCreate();
          });
      }
    }
  };
};

module.exports = createHabitDirective;