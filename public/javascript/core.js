var redAPI = angular.module('redAPI', []);
var url = "http://dev2.red-cloud.io";

redAPI.controller('mainController', function ($scope, $http) {
    $scope.formLogin = {}
    
    $scope.login = function(){
        //call api to connect
    }
});

redAPI.controller('resultController', function ($scope, $http, Auth) {
    $scope.formData = {};
    $scope.token = Auth.getToken();
    
    // when landing on the page, get all devices and show them
    $http.get(url + "/device/result")
        .success(function (data) {
            $scope.devices = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $scope.addData = function () {
        $http.post(url + "/device", $scope.formData)
            .success(function () {
                $http.get(url + "/device/result")
                    .success(function (data) {
                        $scope.devices = data;
                        console.log(data);
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }
});
