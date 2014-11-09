angular.module('MagicApp.planechase', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/planechase', {
    templateUrl: 'partials/planechase.html',
    controller: 'PlanechaseCtrl'
  });
}])

.controller('PlanechaseCtrl', ['$scope','$http', function($scope,$http) {

  $scope.removePlane = function(plane){
    $scope.planes.splice($scope.planes.indexOf(plane),1);
  }

  $scope.planeswalk = function(){
    if($scope.planes.length > 0){
      $scope.currentPlane = $scope.planes[Math.floor(Math.random() * $scope.planes.length)];
      $scope.removePlane($scope.currentPlane);
    }
    else{
      $scope.loadPlanes();
    }
  }

  $scope.rollDie = function(){
    var result = Math.floor(Math.random() * 6);
  }

  $scope.loadPlanes = function(){
    $http.get("./data/planechase.php").success(function(data){
      $scope.planes = data;
      $scope.planeswalk();
    });
  }

  $scope.currentPlane = '';
  $scope.planes = [];

  $scope.loadPlanes();

}]);
