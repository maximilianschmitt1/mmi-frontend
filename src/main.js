'use strict';

require('angular-animate');
require('angular-aria');
require('angular-material');
require('angular-ui-router');
require('ng-autofocus');

var angular = require('angular');

var app = angular.module('habit', ['ngMaterial', 'ui.router', 'ng-autofocus']);

app.constant('API_URL', 'http://192.168.55.55');

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
      controller: 'HabitListController',
      templateUrl: 'habit-list/habit-list.html'
    })
    .state('login', {
      url: '/login',
      controller: 'LoginController',
      templateUrl: 'login/login.html'
    })
    .state('signup', {
      url: '/signup',
      controller: 'SignupController',
      templateUrl: 'signup/signup.html'
    });
});

app.controller('HabitListController', require('./habit-list/habit-list-controller'));
app.controller('SignupController', require('./signup/signup-controller'));
app.controller('LoginController', require('./login/login-controller'));