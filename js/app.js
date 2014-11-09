angular.module('MagicApp',
  [
    'ngRoute',
    'MagicApp.archenemy',
    'MagicApp.planechase'
  ]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/archenemy'});
}]);
