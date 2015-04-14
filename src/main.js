'use strict';

require('ng-autofocus');
require('angular-ui-router');

var angular = require('angular');

var app = angular.module('habit', ['ui.router', 'ng-autofocus']);

app.controller('AppController', function(authService) {
  this.logout = authService.logout;
});

app.controller('HabitListController', require('./habit-list/habit-list-controller'));
app.controller('SignupController', require('./signup/signup-controller'));
app.controller('LoginController', require('./login/login-controller'));
app.service('authService', require('./auth/auth-service'));
app.service('authRegistry', require('./auth/auth-registry'));
app.factory('authTokenInjector', require('./auth/auth-token-injector'));
app.constant('API_URL', 'http://192.168.55.55');

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

app.run(function(authRegistry) {
  authRegistry.config();
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('authTokenInjector');
});