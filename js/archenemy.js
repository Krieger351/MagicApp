angular.module('MagicApp.archenemy', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/archenemy', {
    templateUrl: 'partials/archenemy.html',
    controller: 'ArchenemyCtrl'
  });
}])

.controller('ArchenemyCtrl', [function() {

}]);
