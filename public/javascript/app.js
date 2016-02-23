var redApp = angular.module('redApp', [
  'redServices',
  'redControllers'
]);

// redApp.config(['$httpProvider', function ($httpProvider) {
//     $httpProvider.interceptors.push(function ($q, $cookies) {
//         return {
//             'request': function (config) {
// 
//                 config.headers['authorization'] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VybmFtZSI6Imp1bGlkb24iLCJwYXNzd29yZCI6InBhc3N3b3JkIiwiaWF0IjoxNDU2MjM0NzIyLCJleHAiOjE0NTYyMzUzMjJ9.uQpZoxna8MNK2foq3nuT9qyvcZ-VA1VXoIcGa9ooEW9cDSTvBIWk7vXmFUigDE4R5uNVIyOX7zLzlEMAMPp9N2Ff2KHINhNrCCLbveP2ur2soqo3i-8A83DMob65UB7NuAuk15TOeIjr3RZIeGl2cvUMvF6kOz8qdQesXSENTaLD67rppXnFdLAVwxpVGNse5HLNGORY85UHeSnnMwI11UBKB9uX_qqtXI9mitYUGi0wizUTUYRfs2wFGswOu6shexEgL1jPOGlw4mMMfiyPeMtx86wuLej5fuQnL9VT0UKu6cddaSN-LGf-SHoaNyj3uaeZci2czix1acSlcHxIXg";
//                 return config;
//             }
//         };
//     });   
// }

/* routes example
redApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);
 */