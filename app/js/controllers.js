'use strict';

/* Controllers */

var redControllers = angular.module('redControllers', []);

var url = 'https://user.red-cloud.io';

redControllers.controller('HeaderCtrl', ['$scope', '$location', 'Auth', function ($scope, $location, Auth) {
    $scope.$on('$locationChangeSuccess', function() {
        //EDIT: cope with other path
        $scope.navbarUrl = (Auth.getCookie() != undefined) ? 'partials/navbar-authenticated.html' : 'partials/navbar-anonym.html';
        $scope.headerUrl = (Auth.getCookie() != undefined) ? 'partials/header-authenticated.html' : 'partials/header-anonym.html';
    });
}]);

// Get the user informations given its session token
redControllers.controller('userCtrl', 
    ['$scope', '$location', '$http', 'Auth', function ($scope, $location, $http, Auth) { 

    function authorized() {
        var l = $location.path()
        if( l == '/login' || l == '/register' || l == '/home' || l == '/about' || l == '/login' )
            return true;
        else
            return false;
    }
    
    $scope.$on('$locationChangeSuccess', function() {

        $scope.token = Auth.getCookie();
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
                    $scope.user = data;
                }).error( function (err) {
                    console.log("error");
                    Auth.removeCookie();
                    if(!authorized())
                        $location.path('/login');
                });
        } else {
            if(!authorized())
                $location.path('/login');
        }

    });
}]);


redControllers.controller('DeviceDetailsCtrl', 
    ['$scope', '$routeParams', '$location', '$http', 'Auth', function ($scope, $routeParams, $location, $http, Auth) { 
    

    $scope.token = Auth.getCookie();
    $scope.id = $routeParams.id;

    $scope.e = function(event) {
        console.log(event)
        jQuery(event.target).next().toggleClass('unvisible'); 
    }

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
    ['$scope', '$location', '$http', 'Auth', function ($scope, $location, $http, Auth) {
    
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


redControllers.controller('DeviceCtrl', 
    ['$scope', '$location', '$http', 'Auth','$route', function ($scope, $location, $http, Auth, $route) { 
    
    $scope.token = Auth.getCookie();
    $scope.handle = {}; // create a new data model

    $http({ method: 'GET',
            url: url + '/user/device/list',
            headers: {
                'Authorization': 'Bearer ' + $scope.token,
            }
        }).success( function (data) {
            $scope.devices = data.list;
        }).error( function (err) {
            console.log(err);
        });

    $scope.create = function () {
        if($scope.handle.number == undefined) return;
        $http({
            method: 'GET',
            url: url + '/user/device/new/'+$scope.handle.number,
            headers: {
                'Authorization': 'Bearer ' + $scope.token,
            }
        }).success(function (result) {
            $route.reload();
        }).error(function (err) {
            console.log(err);
        });
    };

}]);



redControllers.controller('authControler', 
    ['$scope', '$location', '$http', 'Auth', function ($scope, $location, $http, Auth) {
    
    $scope.userData = {};
    $scope.authentified = '';

    $scope.logIn = function () {
        $http.post(url + '/login', $scope.userData)
            .success(function (result) {
                //redirect to route
                $scope.authentified = "yes !";
                $scope.token = result;
                
                Auth.setCookie(result.token);
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
            .success(function (result) {
                //redirect to routes
                Auth.setCookie(result.token);
                $location.path('/device');
            })
            .error(function (err) {
                console.log(err);
            });
    }

    $scope.logOut = function () {
        Auth.removeCookie();     
        $location.path('/login');
    }

}]);

redControllers.controller('SoftwareUpload', 
    ['$scope', '$cookies','Upload', '$window','$route', 'Auth', function($scope, $cookies, Upload, $window, $route, Auth) {
    
    $scope.token = Auth.getCookie();

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
                $route.reload();
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

redControllers.controller('SoftwareDetailsCtrl', 
    ['$scope', '$routeParams', '$location', '$http', '$cookies', 'Auth', function ($scope, $routeParams, $location, $http, $cookies, Auth) { 
    

    $scope.token = Auth.getCookie();
    $scope.id = $routeParams.id;

    $http({ method: 'GET',
            url: url + '/user/software/'+$scope.id,
            headers: {
                'Authorization': 'Bearer ' + $scope.token
            }
        }).success( function (data) {
            $scope.details = data;
        }).error( function (err) {
            console.log(err);
        });   
}]);

redControllers.controller('SoftwareContainerCtrl', 
    ['$scope', '$location', '$http', '$cookies', 'Upload', function ($scope, $location, $http, $cookies, Upload) {

    $scope.update = function() {

        jQuery("html, body").animate({ scrollTop: 0 }, "slow");

        if(!jQuery('.add-software').hasClass('visible'))
            jQuery('.add-software').toggleClass('visible');

        jQuery('#soft-name').val($scope.software.name);
        jQuery('#soft-description').val($scope.software.description);        
        jQuery('#soft-submit').html('Update Software');

        //format version
        var version = $scope.software.version;
        version = version.split('.');
        var inc = version[version.length-1];
        inc = parseInt(inc); inc++;
        version[version.length-1] = inc.toString();
        jQuery('#soft-version').val(version.join('.'));

        console.log($scope);

    }

}]);

redControllers.controller('SoftwareCtrl', 
    ['$scope', '$routeParams', '$location', '$http', '$cookies', 'Auth',  function ($scope, $routeParams, $location, $http, $cookies, Auth) {

    $scope.token = Auth.getCookie();

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

}]);
