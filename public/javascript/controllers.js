var redControllers = angular.module('redControllers', []);
var url = "http://dev2.red-cloud.io";

redControllers.controller('authController', ['$scope', '$location', '$http', 'Auth', function ($scope, $location, $http, Auth) {
    $scope.userData = {};
    $scope.authentified = '';
    $scope.token = Auth.getToken();

    $scope.logIn = function () {
        $http.post(url + '/login', $scope.userData)
            .success(function (token) {
                Auth.setToken(token);
                Auth.setUser($scope.userData.username); //only for display
                //redirect to route
                $scope.authentified = "yes !";
                $scope.token = Auth.getToken();
                console.log("ca marche");
            })
            .error(function (err) {
                //TODO display error message
                console.log(err);
                console.log("ca marche pas");
            });
    }

    $scope.register = function () {
        $http.post(url + '/register', $scope.userData)
            .success(function (token) {
                Auth.setToken(token);
                Auth.setUser($scope.userData.username); //only for display
                //redirect to route
                $scope.authentified = "yes !";
                $scope.token = Auth.getToken();
                console.log("ca marche");
            })
            .error(function (err) {
                //TODO display error message
                console.log(err);
                console.log("ca marche pas");
            });
    }
    
    $scope.all = function(){
        $http.get(url + '/user/device/result',{    
            headers: {
                "authorization": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VybmFtZSI6Imp1bGlkb24iLCJwYXNzd29yZCI6InBhc3N3b3JkIiwiaWF0IjoxNDU2MjM0NzIyLCJleHAiOjE0NTYyMzUzMjJ9.uQpZoxna8MNK2foq3nuT9qyvcZ-VA1VXoIcGa9ooEW9cDSTvBIWk7vXmFUigDE4R5uNVIyOX7zLzlEMAMPp9N2Ff2KHINhNrCCLbveP2ur2soqo3i-8A83DMob65UB7NuAuk15TOeIjr3RZIeGl2cvUMvF6kOz8qdQesXSENTaLD67rppXnFdLAVwxpVGNse5HLNGORY85UHeSnnMwI11UBKB9uX_qqtXI9mitYUGi0wizUTUYRfs2wFGswOu6shexEgL1jPOGlw4mMMfiyPeMtx86wuLej5fuQnL9VT0UKu6cddaSN-LGf-SHoaNyj3uaeZci2czix1acSlcHxIXg'
            }})
        .success(function(result){
            $scope.result = result;
        })
        .error(function(err){
            console.log(err);
        });
    }
}]);