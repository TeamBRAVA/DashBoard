'use strict';

/* Controllers */

var redControllers = angular.module('redControllers', []);

var url = 'https://user.red-cloud.io';

redControllers.controller('HeaderCtrl', ['$scope', '$location', '$cookies', function ($scope, $location, $cookies) {
    $scope.$on('$locationChangeSuccess', function() {
        //EDIT: cope with other path
        $scope.navbarUrl = ($cookies.get('token') != undefined) ? 'partials/navbar-authenticated.html' : 'partials/navbar-anonym.html';
        $scope.headerUrl = ($cookies.get('token') != undefined) ? 'partials/header-authenticated.html' : 'partials/header-anonym.html';
    });
}]);

// Get the user informations given its session token
redControllers.controller('userCtrl', ['$scope', '$location', '$http', '$cookies', function ($scope, $location, $http, $cookies) { 
    $scope.$on('$locationChangeSuccess', function() {

        $scope.token = $cookies.get('token');
        $scope.user = {username : 'Bienvenue' };
        // User already authenticated
        if( $scope.token != undefined) {
            // To Do : Get the user infos
            $http({ method: 'GET',
                    url: url + '/user/info',
                    headers: {
                        'Authorization': 'Bearer ' + $scope.token
                    }
                }).success( function (data) {
                    console.log(data);
                    $scope.user = data;
                }).error( function (err) {
                    console.log(err);
                    $location.path('/login');
                });
        }
    });
}]);






/**
 *  Software related controllers
 *
 */ 


// Controller for the upload of softwares
redControllers.controller('SoftwareUpload', ['$scope', '$cookies','Upload', '$window', function($scope, $cookies, Upload, $window) {
    
    $scope.token = $cookies.get('token');

    var vm = this;
    vm.submit = function(){ //function to call on form submit
        if (vm.form.file.$valid && vm.file) { //check if from is valid
            vm.upload(vm.file); //call upload function
        }
    }
    vm.upload = function (file) {
        Upload.upload({
            url: url + '/user/software/add', //webAPI exposed to upload the file
            headers: {
                'Authorization': 'Bearer ' + $scope.token,
            },
            data:{
                file:file,
                name: vm.name,
                version: vm.version,
                description: vm.description
            } //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            console.log(resp);
            if(resp.status == 200){ 
                // Success for upload
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            $window.alert('Error status: ' + resp.status);
        }, function (evt) {
            // Event
        });
    };
}]);

redControllers.controller('SoftwareContainerCtrl', 
    ['$scope', '$location', '$http', '$cookies', function ($scope, $location, $http, $cookies) {
    
    /*$http({ method: 'GET',
            url: url + '/user/software/summary/'+$scope.device,
            headers: {
                'Authorization': 'Bearer ' + $scope.token,
            }
        }).success( function (data) {
            $scope.summary = data;
        }).error( function (err) {
            console.log(err);
        });*/

}]);

redControllers.controller('SoftwareCtrl', 
    ['$scope', '$routeParams', '$location', '$http', '$cookies', function ($scope, $routeParams, $location, $http, $cookies) {

    $scope.token = $cookies.get('token');

    $http({ method: 'GET',
            url: url + '/user/software/list',
            headers: {
                'Authorization': 'Bearer ' + $scope.token
            }
    }).success( function (data) {
        $scope.softwares = data;
    }).error( function (err) {
        console.log(err);
    });

    /*$http({ method: 'GET',
            url: url + '/user/software/list/all',
            headers: {
                'Authorization': 'Bearer ' + $scope.token
            }
    }).success( function (data) {
        
    }).error( function (err) {
        console.log(err);
    });*/

}]);


redControllers.controller('DeviceDetailsCtrl', 
    ['$scope', '$routeParams', '$location', '$http', '$cookies', function ($scope, $routeParams, $location, $http, $cookies) { 
    

    $scope.token = $cookies.get('token');
    $scope.id = $routeParams.id;

    $http({ method: 'GET',
            url: url + '/user/device/summary/'+$scope.id,
            headers: {
                'Authorization': 'Bearer ' + $scope.token
            }
        }).success( function (data) {
            $scope.details = data;
        }).error( function (err) {
            console.log(err);
        });
    $http({ method: 'GET',
            url: url + '/user/device/'+$scope.id,
            headers: {
                'Authorization': 'Bearer ' + $scope.token
            }
        }).success( function (data) {
            $scope.data = data.data;
        }).error( function (err) {
            console.log(err);
        });    
    

}]);


redControllers.controller('DeviceContainerCtrl', 
    ['$scope', '$location', '$http', '$cookies', function ($scope, $location, $http, $cookies) {
    
    $http({ method: 'GET',
            url: url + '/user/device/summary/'+$scope.device,
            headers: {
                'Authorization': 'Bearer ' + $scope.token,
            }
        }).success( function (data) {
            $scope.summary = data;
        }).error( function (err) {
            console.log(err);
        });

}]);


redControllers.controller('DeviceCtrl', ['$scope', '$location', '$http', '$cookies', function ($scope, $location, $http, $cookies) { 
    
    $scope.token = $cookies.get('token');
    $scope.handle = {}; // create a new data model

    $http({ method: 'GET',
            url: url + '/user/device/list',
            headers: {
                'Authorization': 'Bearer ' + $scope.token,
            }
        }).success( function (data) {
            $scope.devices = data.list;
            console.log(data.list);
        }).error( function (err) {
            console.log(err);
        });

    $scope.create = function () {
        $http({
            method: 'GET',
            url: url + '/user/device/new/'+$scope.handle.number,
            headers: {
                'Authorization': 'Bearer ' + $scope.token,
            }
        }).success(function (result) {
            console.log(result);
        }).error(function (err) {
            console.log(err);
        });
    };

}]);



redControllers.controller('authControler', ['$scope', '$location', '$http', '$cookies', function ($scope, $location, $http, $cookies) {
    $scope.userData = {};
    $scope.authentified = '';

    $scope.logIn = function () {
        $http.post(url + '/login', $scope.userData)
            .success(function (result) {
                //redirect to route
                $scope.authentified = "yes !";
                $scope.token = result;

                $cookies.put('token', result.token);
                $location.path('/device');
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
                //redirect to routes
                $cookies.put('token', token.token);
                $location.path('/device');
            })
            .error(function (err) {
                console.log(err);
            });
    }

    $scope.logout = function () {
       $cookies.remove('token');  // Remove the token to logout the user
       $location.path('/login');
    }

}]);
