/**
 * Created by unoolshogun on 10/02/16.
 */
'use strict';

/* Controllers */
var url = "http://dev2.red-cloud.io";
var devicecatApp = angular.module('deviceApp', []);

devicecatApp.controller('deviceListCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get(url+"/device/result").success(function(data) {
        $scope.deviceData = data;
        console.log(data);
    });
}]);

