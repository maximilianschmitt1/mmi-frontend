'use strict';

require('angular-animate');
require('angular-aria');
require('angular-material');
require('angular-ui-router');
require('ng-autofocus');

var angular = require('angular');

var app = angular.module('habit', ['ngMaterial', 'ui.router', 'ng-autofocus']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider
    .theme('default')
    .primaryPalette('red');
});

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('dashboard', {
      url: '/',
      templateUrl: 'views/habit-list.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html'
    });
});

app.controller('HabitListController', require('./controllers/habit-list-controller'));