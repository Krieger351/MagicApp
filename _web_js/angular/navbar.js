angular.module('MagicApp.navbar',[])

.controller('NavbarCtrl', ['$scope','$location', function($scope,$location) {
  $scope.location = $location;
  $scope.isCollapsed = true;
}]);
