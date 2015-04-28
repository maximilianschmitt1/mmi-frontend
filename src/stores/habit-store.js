'use strict';

var moment = require('moment');
var find = require('array-find');
var achievementList = require('../achievements/achievements');
var decimalAdjust = require('decimal-adjust');

var round = function(value) {
  return decimalAdjust('round', value, -2);
};

var habits = [];

var habitStore = function($http, API_URL) {
  return {
    list: function() {
      return $http.get(API_URL + '/habits').then(parseHabits);

      function parseHabits(res) {
        res.data.habits.forEach(parseHabit);
        habits = res.data.habits;
        return habits;
      }
    }
  };
};

module.exports = habitStore;

function parseHabit(habit) {
  var now = moment();

  habit._before = find(habits, function(oldHabit) {
    return oldHabit._id === habit._id;
  });

  if (habit._before) {
    if (habit._before.level.value < habit.level.value) {
      habit.levelledUp = true;
    }
  }

  habit.createdAt = moment(habit.createdAt);
  var activities = Object.keys(habit.activities)
    .map(function(key) {
      var activity = habit.activities[key];
      activity.time = moment(activity.time);
      return activity;
    });

  habit.today = habit.activities[timeId(now)] ? habit.activities[timeId(now)].type : null;
  habit.daysSince = moment().hour(0).minute(0).second(1).diff(moment(habit.createdAt).hour(0).minute(0).second(1), 'days') + 1;
  habit.days = days(habit);
  habit.longestStreak = longestStreak(habit);
  habit.currentStreak = currentStreak(habit);
  habit.successfulDays = habit.days.filter(function(day) { return day.type === 'success'; });
  habit.failedDays = habit.days.filter(function(day) { return day.type === 'fail'; });
  habit.successRate = round((habit.successfulDays.length / habit.daysSince) * 100);
  habit.lastSuccessRate = round((habit.successfulDays.filter(function(day) { return !day.isToday ;}).length / ((habit.daysSince - 1) || 1))  * 100);
  habit.successRateDevelopment = habit.successRate > habit.lastSuccessRate ? 'increase' : habit.successRate > habit.lastSuccessRate ? 'decrease' : 'stable';
  habit.achievements = achievements(habit);
  habit.achievedAchievements = habit.achievements.filter(function(achievement) { return achievement.achieved; });
  habit.newAchievements = newAchievements(habit);
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

function achievements(habit) {
  return achievementList.map(function(achievement) {
    return {
      title: achievement.title,
      description: achievement.description,
      icon: achievement.icon,
      achieved: achievement.check(habit)
    };
  });
}

function newAchievements(habit) {
  if (!habit._before) {
    return [];
  }

  return habit.achievements.filter(function(achievement, i) {
    return achievement.achieved && !habit._before.achievements[i].achieved;
  });
}

function longestStreak(habit) {
  var longest = 0;
  var current = 0;

  habit.days.forEach(function(day) {
    if (day.type === 'success') {
      current++;
    } else {
      current = 0;
      return;
    }

    if (current > longest) {
      longest = current;
    }
  });

  return longest;
}

function currentStreak(habit) {
  var today = habit.daysSince - 1;
  var streak = 0;

  while (habit.days[today - streak] && habit.days[today - streak].type === 'success') {
    streak++;
  }

  return streak;
}

function timeId(m) {
  return m.format('YYYYMMDD');
}