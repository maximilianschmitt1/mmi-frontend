'use strict';

var achievements = [
  {
    title: 'Guter Start!',
    description: 'Am 1. Tag das Tagesziel erreichen.',
    icon: '/achievements/icons/guter-start.svg',
    check: function(habit) {
      return habit.days[0].type === 'success';
    }
  },
  {
    title: '3-Tage-Erfolgsserie',
    description: 'Eine 3-tägige Erfolgsserie hinlegen.',
    icon: '/achievements/icons/3-tage-erfolgsserie.svg',
    check: function(habit) {
      return habit.longestStreak >= 3;
    }
  },
  {
    title: '7-Tage-Erfolgsserie',
    description: 'Eine 7-tägige Erfolgsserie hinlegen.',
    icon: '/achievements/icons/7-tage-erfolgsserie.svg',
    check: function(habit) {
      return habit.longestStreak >= 7;
    }
  },
  {
    title: '14-Tage-Erfolgsserie',
    description: 'Eine 14-tägige Erfolgsserie hinlegen.',
    icon: '/achievements/icons/14-tage-erfolgsserie.svg',
    check: function(habit) {
      return habit.longestStreak >= 14;
    }
  },
  {
    title: '30-Tage-Erfolgsserie',
    description: 'Eine 30-tägige Erfolgsserie hinlegen.',
    icon: '/achievements/icons/30-tage-erfolgsserie.svg',
    check: function(habit) {
      return habit.longestStreak >= 30;
    }
  },
  {
    title: 'Halbzeit',
    description: 'Am 33. Tag das Tagesziel erreichen.',
    icon: '/achievements/icons/halbzeit.svg',
    check: function(habit) {
      return habit.days[32].type === 'success';
    }
  },
  {
    title: 'Habit erfolgreich abgeschlossen',
    description: 'Nach 66 Tagen eine Erfolgsrate von über 80% haben.',
    icon: '/achievements/icons/habit-erfolgreich-abgeschlossen.svg',
    check: function(habit) {
      return habit.daysSince >= 66 && habit.successRate >= 80;
    }
  },
  {
    title: 'Habit perfekt abgeschlossen',
    description: 'Nach 66 Tagen eine Erfolgsrate von 100% haben.',
    icon: '/achievements/icons/habit-perfekt-abgeschlossen.svg',
    check: function(habit) {
      return habit.daysSince >= 66 && habit.successRate >= 100;
    }
  }
];

module.exports = achievements;