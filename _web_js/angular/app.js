angular.module('MagicApp',
  [
    'ngRoute',
    'MagicApp.archenemy',
    'MagicApp.planechase',
    'MagicApp.navbar'
  ]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: 'planechase'});
}]);
