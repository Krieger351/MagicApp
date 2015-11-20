angular.module('MagicApp.planechase', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/planechase', {
    templateUrl: 'partials/planechase.html',
    controller: 'PlanechaseCtrl'
  });
}])
.controller('PlanechaseCtrl', ['$scope','$http', function($scope,$http) {
  $scope.settings = {
    'includePhenomenon':true
  }

  $scope.planes = {}

  $scope.keys = [];

  $scope.currentList = {}

  $scope.currentPlane = "";

  $scope.heldPlanes = [];

  $scope.planeswalk = function(){
    $scope.currentPlane = $scope.keys.shift();
  }
  $scope.getKeys = function(callback){
    $http.get("/data/planechase/keys")
      .then(function(response) {
          $scope.keys = window.knuthShuffle(response.data);
          if(callback){
            callback();
          }
        }
    );
  }
  $scope.getPlanes = function(callback){
    $http.get("/data/planechase")
      .then(function(response) {
          $scope.planes = response.data
          if(callback){
            callback();
          }
        }
    );
  }

  $scope.shuffle = function(){
    $scope.keys = window.knuthShuffle($scope.keys);
  }
  $scope.holdPlane = function(){
    $scope.heldPlanes.push($scope.currentPlane);
    $scope.planeswalk();
  }
  $scope.clear = function(plane){
    $scope.heldPlanes.splice($scope.heldPlanes.indexOf(plane),1);
  }
  $scope.putOnTop = function(plane){
    $scope.keys.unshift($scope.currentPlane);
    $scope.currentPlane = plane;
    $scope.heldPlanes.splice($scope.heldPlanes.indexOf(plane),1);
  }
  $scope.putOnBottom = function(plane){
    if(plane)
    {
      $scope.keys.push(plane);
      $scope.heldPlanes.splice($scope.heldPlanes.indexOf(plane),1);
    }
    else{
      $scope.keys.push($scope.currentPlane)
      $scope.planeswalk();
    }
  }
  $scope.restart = function(){
    $scope.getKeys(function(){
      $scope.planeswalk();
      $scope.getPlanes();
    });
  }
  $scope.restart();
}]);
