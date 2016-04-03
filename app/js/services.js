'use strict';

/* Services */

var redServices = angular.module('redServices', []);

redServices.factory('Auth', ['$cookies' , function($cookies) {
  var auth = {};
  
  auth.getCookie = function(){
      return $cookies.get('token');
  }
  
  auth.setCookie = function(value){
      $cookies.put('token', value);
  }
  
  auth.removeCookie = function(){
      $cookies.remove('token');
  }

  return auth;
}]);
