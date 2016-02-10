var redServices = angular.module('redServices', []);
var url = "http://dev2.red-cloud.io"; //transformer en service ??

redServices.service('Auth', function () {
    var token;
    var user;

    return {
        getToken: function () {
            return token;
        },
        setToken: function (newToken) {
            token = newToken;
        },
        getUser: function () {
            return user;
        },
        setUser: function (newUser) {
            user = newUser;
        },
        isConnected: function () {
            return !!token;
        }
    };
});