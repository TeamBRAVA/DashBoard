/**
 * Created by unoolshogun on 10/02/16.
 */
'use strict';

/* Controllers */

var deviceApp = angular.module('deviceApp', []);

deviceApp.controller('deviceListCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('http://dev2.red-cloud.io/device/result').success(function(data) {
        $scope.deviceData = data;
    });
}]);
