'use strict';

var LevelUpModal = require('../modals/level-up/level-up-modal');
var AchievementModal = require('../modals/achievement/achievement-modal');
var assign = require('object.assign');
var scroll2 = require('scroll');
var bowser = require('bowser').browser;
var mobile = bowser.mobile || bowser.tablet;

var habitListItem = function($http, API_URL, ModalService, $q, habitStore) {
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
      scope.$watch('habit', function onReload(habit) {
        queueModals(habit);
        scope.loading = false;
      });

      if (mobile) {
        scope.$watch('toggled', function(toggled) {
          window.setTimeout(function() {
            if (toggled) {
              scroll2.top(document.body, offsetTop(el[0]));
            }
          }, 1);
        });
      }

      scope.rename = function() {
        var name = window.prompt('Habit umbenennen:', scope.habit.name);
        if (name === scope.habit.name) {
          return;
        }

        $http
          .put(API_URL + '/habits/' + scope.habit._id, { name: name })
          .then(scope.onChange);
      };

      scope.correctTodaysActivity = function() {
        scope.correctingTodaysActivity = true; 
      };

      scope.stopCorrectingTodaysActivity = function() {
        scope.correctingTodaysActivity = false; 
      };

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
        scope.loading = true;
        return $http
          .post(API_URL + '/habits/' + habit._id + '/activity', { type: 'success' })
          .then(scope.onChange);
      };

      scope.fail = function(habit) {
        scope.loading = true;
        return $http
          .post(API_URL + '/habits/' + habit._id + '/activity', { type: 'fail' })
          .then(scope.onChange);
      };
    }
  };

  function queueModal(queue, config, delay) {
    if (!delay) {
      queue.push(function() {
        return $q(function(resolve, reject) {
          ModalService
            .showModal(config)
            .then(function(modal) {
              modal.close.then(resolve);
            });
        });
      });
      return;
    }

    queue.push(function() {
      return $q(function(resolve, reject) {
        setTimeout(function() {
          ModalService.showModal(config)
            .then(function(modal) {
              modal.close.then(resolve);
            });
        }, delay);
      });
    });
  }



  function queueModals(habit) {
    var modals = [];

    if (habit.levelledUp) {
      queueModal(modals, {
        templateUrl: '/modals/level-up/level-up-modal.html',
        controller: LevelUpModal,
        inputs: {
          habit: habit
        }
      }, 1000);
    }

    if (habit.newAchievements.length) {
      habit.newAchievements.forEach(function(achievement) {
        queueModal(modals, {
          templateUrl: '/modals/achievement/achievement-modal.html',
          controller: AchievementModal,
          inputs: {
            habit: habit,
            achievement: achievement
          }
        });
      });
    }

    modals.reduce(function(last, next) {
      return last.then(next);
    }, Promise.resolve());
  }
};

function offsetTop(element) {
  var de = document.documentElement;
  var box = element.getBoundingClientRect();
  return box.top + window.pageYOffset - de.clientTop;
}

module.exports = habitListItem;