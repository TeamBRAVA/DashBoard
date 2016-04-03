/**
 *  Software related controllers
 *
 */ 


// Controller for the upload of softwares
redControllers.controller('SoftwareUpload', ['$scope', '$cookies','Upload', '$window','$route', function($scope, $cookies, Upload, $window, $route) {
    
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

    }

}]);

redControllers.controller('SoftwareCtrl', 
    ['$scope', '$routeParams', '$location', '$http', '$cookies',  function ($scope, $routeParams, $location, $http, $cookies) {

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

}]);