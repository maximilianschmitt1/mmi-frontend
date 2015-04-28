'use strict';

var LevelUpModal = require('../modals/level-up/level-up-modal');

var habitListItem = function($http, API_URL, ModalService) {
  return {
    templateUrl: '/habit-list-item/habit-list-item.html',
    scope: {
      onChange: '&',
      habit: '=',
      toggled: '=',
      toggle: '&',
      allCollapsed: '=',
      onDelete: '&'
    },
    link: function(scope, el, attrs) {
      var habit = scope.habit;
      if (habit.levelledUp) {
        setTimeout(function() {
          ModalService
            .showModal({
              templateUrl: '/modals/level-up/level-up-modal.html',
              controller: LevelUpModal,
              inputs: {
                habit: habit
              }
            });
        }, 1000);
      }

      scope.delete = function(habit) {
        if (!window.confirm('Bist du sicher, dass du den Habit \'' + habit.name + '\' löschen möchtest?')) {
          return;
        }

        return $http
          .delete(API_URL + '/habits/' + habit._id)
          .then(scope.onDelete)
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