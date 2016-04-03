'use strict';

/* App Module */

var redApp = angular.module('redApp', [
  'ngRoute',
  'redServices',
  'ngCookies',
  'ngFileUpload',
  //'redAnimations',
  'redControllers'
  //'redFilters',
  
]);

redApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/device', {
        templateUrl: 'partials/device.html',
        controller: 'DeviceCtrl'
      }).
      when('/device/:id', {
        templateUrl: 'partials/device-details.html',
        controller: 'DeviceDetailsCtrl'
      }).
      when('/software', {
        templateUrl: 'partials/software.html',
        controller: 'SoftwareCtrl'
      }).
      when('/software/:id', {
        templateUrl: 'partials/software-details.html',
        controller: 'SoftwareDetailsCtrl'
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'authControler'
      }).
      when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'authControler'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);
