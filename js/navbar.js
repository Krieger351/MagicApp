angular.module('MagicApp.navbar',['ui.bootstrap'])

.controller('NavbarCtrl', ['$scope','$location', function($scope,$location) {
  $scope.location = $location;
  $scope.isCollapsed = true;
}]);
