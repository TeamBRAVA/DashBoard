var redControllers = angular.module('redControllers', []);
var url = "http://dev2.red-cloud.io";

redControllers.controller('authController', ['$scope', '$location', '$http', '$cookies', function ($scope, $location, $http, $cookies) {
    $scope.userData = {};
    $scope.authentified = '';

    $scope.logIn = function () {
        $http.post(url + '/login', $scope.userData)
            .success(function (result) {
                //redirect to route
                $scope.authentified = "yes !";
                $scope.token = result;

                $cookies.put('token', result.token);
            })
            .error(function (err) {
                //TODO display error message
                console.log(err);
                if (err.message == "Unauthorized.") {
                    $scope.result = "wrong login or password";
                }
            });
    }

    $scope.register = function () {
        $http.post(url + '/register', $scope.userData)
            .success(function (token) {
                //redirect to route
                $scope.authentified = "yes !";
                console.log("ca marche");
            })
            .error(function (err) {
                //TODO display error message
                console.log(err);
                console.log("ca marche pas");
            });
    }

    $scope.all = function () {
        var token = $cookies.get('token');
        console.log(token);
        $http({
            method: 'GET',
            url: url + '/user/device/result',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
        .success(function (result) {
            $scope.result = result;
        })
        .error(function (err) {
            console.log(err);
        });
    }
}]);