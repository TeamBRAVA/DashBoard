/**
 * Created by unoolshogun on 10/02/16.
 */
'use strict';

/* Controllers */

var devicecatApp = angular.module('deviceApp', []);

<<<<<<< HEAD
deviceApp.controller('deviceListCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('http://dev2.red-cloud.io/device/result').success(function(data) {
=======
devicecatApp.controller('deviceListCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('device/device.json').success(function(data) {
>>>>>>> d5daf215e1fa955a0f6e7be77f9154619342b503
        $scope.deviceData = data;
    });
}]);
