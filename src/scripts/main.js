'use strict';

var angular = require('angular');
require('angular-animate');
require('angular-aria');
require('angular-material');

var app = angular.module('habit', ['ngMaterial']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider
    .theme('default')
    .primaryPalette('red');
});

app.controller('habitListController', require('./controllers/habit-list-controller'));