var redControllers = angular.module('redControllers', []);
var url = "http://dev2.red-cloud.io";

redControllers.controller('authController', ['$scope', '$location', '$http', 'Auth', function ($scope, $location, $http, Auth) {
    $scope.userData = {};
    $scope.authentified = '';
    $scope.token = Auth.getToken();

    $scope.logIn = function () {
        $http.post(url + '/user/login', $scope.userData)
            .success(function (token) {
                Auth.setToken(token);
                Auth.setUser($scope.userData.username); //only for display
                //redirect to route
                $scope.authentified = "yes !";
                $scope.token = Auth.getToken();
                console.log("ca marche");
            })
            .error(function () {
                //TODO display error message
                console.log("ca marche pas");
            });
    }

    $scope.register = function () {
        $http.post(url + '/user/register', $scope.userData)
            .success(function (token) {
                Auth.setToken(token);
                Auth.setUser($scope.userData.username); //only for display
                //redirect to route
                $scope.authentified = "yes !";
                $scope.token = Auth.getToken();
                console.log("ca marche");
            })
            .error(function () {
                //TODO display error message
                console.log("ca marche pas");
            });
    }
}]);