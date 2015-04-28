'use strict';

var habitListItem = function($http, API_URL) {
  return {
    templateUrl: '/habit-list-item/habit-list-item.html',
    scope: {
      onChange: '&',
      habit: '=',
      toggled: '=',
      toggle: '&'
    },
    link: function(scope, el, attrs) {
      scope.delete = function(habit) {
        if (!window.confirm('Bist du sicher, dass du den Habit \'' + habit.name + '\' löschen möchtest?')) {
          return;
        }

        return $http
          .delete(API_URL + '/habits/' + habit._id)
          .then(scope.onChange);
      };

      scope.succeed = function(habit) {
        return $http
          .post(API_URL + '/habits/' + habit._id + '/activity', { type: 'success' })
          .then(scope.onChange);
      };

      scope.fail = function(habit) {
        return $http
          .post(API_URL + '/habits/' + habit._id + '/activity', { type: 'fail' })
          .then(scope.onChange);
      };
    }
  };
};

module.exports = habitListItem;