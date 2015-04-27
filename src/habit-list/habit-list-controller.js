'use strict';

var assign = require('object.assign');
var moment = require('moment');

var HabitListController = function($scope, $http, API_URL) {
  $scope.habits = [];

  getHabits();

  $scope.reload = getHabits;

  $scope.showCreateHabitForm = function() {
    $scope.createHabit = true;
  };

  $scope.hideCreateHabitForm = function() {
    $scope.createHabit = false;
  };

  $scope.toggleDetails = function(habit) {
    $scope.detailedHabit = $scope.detailedHabit === habit ? null : habit;
  };

  $scope.isToggled = function(habit) {
    return $scope.detailedHabit ? $scope.detailedHabit._id === habit._id : false;
  };

  $scope.delete = function(habit) {
    if (!window.confirm('Bist du sicher, dass du den Habit \'' + habit.name + '\' löschen möchtest?')) {
      return;
    }

    return $http
      .delete(API_URL + '/habits/' + habit._id)
      .then(getHabits);
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
    const activities = Object.keys(habit.activities)
      .map(function(key) {
        var activity = habit.activities[key];
        activity.time = moment(activity.time);
        return activity;
      });

    habit.today = habit.activities[timeId(now)] ? habit.activities[timeId(now)].type : null;
    habit.daysSince = moment().hour(0).minute(0).second(1).diff(moment(habit.createdAt).hour(0).minute(0).second(1), 'days') + 1;
    habit.days = days(habit);
  }

  function days(habit) {
    var habitDays = [];
    var totalDays = habit.duration;
    var today = habit.daysSince - 1;
    for (var day = 0; day < totalDays; day++) {
      var dayOfMonth = moment(habit.createdAt).hour(0).minute(0).second(1).add(day, 'days');
      var activity = habit.activities[timeId(dayOfMonth)];

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
    return m.format('YYYYMMDD');
  }
};

module.exports = HabitListController;