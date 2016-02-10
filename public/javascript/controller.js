/**
 * Created by unoolshogun on 10/02/16.
 */
'use strict';

/* Controllers */

var devicecatApp = angular.module('deviceApp', []);

devicecatApp.controller('deviceListCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('device/device.json').success(function(data) {
        $scope.deviceData = data;
    });
}]);
