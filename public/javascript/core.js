var redAPI = angular.module('redAPI', []);

redAPI.controller('mainController', function ($scope, $http) {
    $scope.formLogin = {}
    
    $scope.login = function(){
        //call api to connect
    }
});

redAPI.controller('resultController', function ($scope, $http) {
    $scope.formData = {};
    
    // when landing on the page, get all devices and show them
    $http.get("http://localhost:3000/result")
        .success(function (data) {
            $scope.devices = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $scope.addData = function () {
        $http.post("http://localhost:3000/device", $scope.formData)
            .success(function () {
                $http.get('http://localhost:3000/result')
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
