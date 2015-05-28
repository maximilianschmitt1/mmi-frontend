'use strict';

var angular = require('angular');
var Velocity = require('velocity-animate');

var experienceBar = /*@ngInject*/ function() {
  return {
    templateUrl: '/experience-bar/experience-bar.html',
    link: function(scope, el, attrs) {
      var progress = el.children()[0];

      function animate(habit) {
        if (!habit.level.animated && habit.levelChanged) {
          animateOverLevel(progress, habit);
        } else if (!habit.level.animated && habit._before && habit._before.xp !== habit.xp) {
          animateXpGain(progress, habit);
        } else {
          progress.style.width = xpPercentage(habit);
        }
      }

      scope.$watch('habit', animate);
    }
  };
};

function xpPercentage(habit) {
  var goal = habit.level.xp;
  var current = habit.xp;
  var percent = Math.round((current / goal) * 100);
  
  if (percent < 1) {
    percent = 1;
  }

  return percent + '%';
}

function animateOverLevel(progress, habit) {
  progress.style.width = xpPercentage(habit._before);
  var fromPercent = habit.levelledUp ? 100 : 0;
  return Velocity.animate(progress, { width: fromPercent + '%' }, 1000).then(nextLevel);

  function nextLevel() {
    progress.style.width = Math.abs(fromPercent - 100) + '%';
    return Velocity.animate(progress, { width: xpPercentage(habit) }, 1000)
      .then(function() { habit.level.animated = true; });
  }
}

function animateXpGain(progress, habit) {
  progress.style.width = xpPercentage(habit._before);
  return Velocity.animate(progress, { width: xpPercentage(habit) }, 1000)
    .then(function() { habit.level.animated = true; });
}

module.exports = experienceBar;
