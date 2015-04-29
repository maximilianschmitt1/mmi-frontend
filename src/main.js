'use strict';

require('ng-autofocus');
require('angular-ui-router');
require('angular-modal-service');
require('angular-tooltips');
require('ng-slide-down');

var angular = require('angular');

var app = angular.module('habit', ['ui.router', 'ng-autofocus', 'angularModalService', '720kb.tooltips', 'ng-slide-down']);

app.controller('AppController', function(authService, $state) {
  this.logout = authService.logout;
});

app.controller('HabitListController', require('./habit-list/habit-list-controller'));
app.controller('SignupController', require('./signup/signup-controller'));
app.controller('LoginController', require('./login/login-controller'));

app.directive('habitListItem', require('./habit-list-item/habit-list-item-directive'));
app.directive('createHabit', require('./create-habit/create-habit-directive'));
app.directive('experienceBar', require('./experience-bar/experience-bar-directive'));
app.directive('levelIndicator', require('./level-indicator/level-indicator-directive'));
app.directive('modal', require('./modals/modal-directive'));

app.service('habitStore', require('./stores/habit-store'));

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
      templateUrl: 'habit-list/habit-list.html',
      auth: true
    })
    .state('create-habit', {
      url: '/habits/create',
      controller: 'CreateHabitController',
      templateUrl: 'create-habit/create-habit.html',
      auth: true
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

app.run(function(authRegistry, $rootScope, $state) {
  authRegistry.config();

  // redirect auth-routes to login if not logged in
  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    if (toState.auth && !authRegistry.token()) {
      $rootScope.previousState = {
        name: toState.name,
        params: toParams
      };

      $state.go('login');
      e.preventDefault();
    }
  });

  $rootScope.$on('login', function() {
    $state.go('dashboard');
  });

  $rootScope.$on('logout', function() {
    $state.go('login');
  });
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('authTokenInjector');
});