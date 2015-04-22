'use strict';

var assign = require('object.assign');
var moment = require('moment');

var HabitListController = function($scope, $http, API_URL) {
  $scope.habits = [];

  getHabits();

  $scope.toggleDetails = function(habit) {
    $scope.detailedHabit = $scope.detailedHabit === habit ? null : habit;
  };

  $scope.isToggled = function(habit) {
    return $scope.detailedHabit ? $scope.detailedHabit._id === habit._id : false;
  };

  $scope.succeed = function(habit) {
    return $http
      .post(API_URL + '/habits/' + habit._id + '/activity', { type: 'success' })
      .then(getHabits);
  };

  $scope.fail = function(habit) {
    return $http
      .post(API_URL + '/habits/' + habit._id + '/activity', { type: 'fail' })
      .then(getHabits);
  };

  function getHabits() {
    return $http
      .get(API_URL + '/habits')
      .then(function(res) {
        var habits = res.data.habits;
        habits.forEach(parseHabit);
        $scope.habits = res.data.habits;
      });
  }

  function parseHabit(habit) {
    var now = moment();
    habit.createdAt = moment(habit.createdAt);

    Object.keys(habit.activities).forEach(function(key) {
      var activity = habit.activities[key];
      activity.time = moment(activity.time);
    });

    habit.today = habit.activities[timeId(now)] ? habit.activities[timeId(now)].type : null;
    habit.daysSince = moment(habit.createdAt).diff(moment(), 'days') + 1;
    habit.days = days(habit);
  }

  function days(habit) {
    var habitDays = [];
    var totalDays = habit.duration;
    var today = habit.daysSince - 1;

    for (var day = 0; day < totalDays; day++) {
      var activity = habit.activities[timeId(habit.createdAt.add(day, 'days'))];

      if (activity) {
        activity.day = day + 1;
        activity.isToday = day === today;
        habitDays.push(activity);
      } else if (!activity && day >= habit.daysSince - 1) {
        habitDays.push({ type: 'pending', day: day + 1, isToday: day === today });
      } else {
        habitDays.push({ type: 'fail', day: day + 1, isToday: day === today });
      }
    }

    return habitDays;
  }

  function timeId(m) {
    var d = m.toDate();
    return '' + d.getFullYear() + d.getMonth() + d.getDay();
  }
};

module.exports = HabitListController;