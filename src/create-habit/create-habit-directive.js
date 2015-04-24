'use strict';

var createHabit = function(API_URL, $http) {
  return {
    restrict: 'E',
    templateUrl: '/create-habit/create-habit.html',
    scope: {
      onCreate: '&'
    },
    link: function(scope, el, attrs) {
      var habitDefaults = {
        name: ''
      };

      scope.habit = {
        name: habitDefaults.name
      };

      scope.createHabit = function(habit) {
        $http
          .post(API_URL + '/habits', habit)
          .then(function(res) {
            scope.habit = {
              name: habitDefaults.name
            };

            scope.onCreate();
          });
      };
    }
  };
};

module.exports = createHabit;