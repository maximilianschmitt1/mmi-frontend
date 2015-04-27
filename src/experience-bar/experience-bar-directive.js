'use strict';

var angular = require('angular');
var Velocity = require('velocity-animate');

var experienceBar = function() {
  return {
    templateUrl: '/experience-bar/experience-bar.html',
    link: function(scope, el, attrs) {
      var habit = scope.habit;

      var progress = el.children()[0].children[0];

      if (habit.levelledUp) {
        animateOverLevel(progress, habit);
      } else if (habit._before && habit._before.xp !== habit.xp) {
        animateXpGain(progress, habit);
      } else {
        progress.style.width = xpPercentage(habit);
      }
    }
  };
};

function xpPercentage(habit) {
  var goal = habit.level.xpForNextLevel;
  var current = habit.xp;
  var percent = Math.round((current / goal) * 100);
  
  if (percent < 1) {
    percent = 1;
  }

  return percent + '%';
}

function animateOverLevel(progress, habit) {
  progress.style.width = xpPercentage(habit._before);
  return Velocity.animate(progress, { width: '100%' }, 1000).then(nextLevel);

  function nextLevel() {
    progress.style.width = 0;
    return Velocity.animate(progress, { width: xpPercentage(habit) }, 1000);
  }
}

function animateXpGain(progress, habit) {
  progress.style.width = xpPercentage(habit._before);
  return Velocity.animate(progress, { width: xpPercentage(habit) }, 1000);
}

module.exports = experienceBar;