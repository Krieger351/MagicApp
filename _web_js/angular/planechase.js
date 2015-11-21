angular.module('MagicApp.planechase', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/planechase', {
    templateUrl: 'partials/planechase.html',
    controller: 'PlanechaseCtrl'
  })
  .when('/planechase/planes', {
    templateUrl: 'partials/planechase-all.html',
    controller: 'PlanechaseCtrl'
  })
  .when('/planechase/planes/:plane', {
    templateUrl: 'partials/planechase-plane.html',
    controller: 'PlanechaseCtrl'
  });
}])
.controller('PlanechaseCtrl', ['$scope','$http','$routeParams', function($scope,$http,$routeParams) {
  $scope.settings = {
    'includePhenomenon':true
  }
  $scope.singlePlane=$routeParams.plane;

  $scope.planes = {}

  $scope._keys = [];
  $scope.keys = [];

  $scope.currentPlane = "";

  $scope.heldPlanes = [];

  $scope.planeswalk = function(){
    $scope.currentPlane = $scope.keys.shift();
  }
  $scope.getKeys = function(callback){
    $http.get("/data/planechase/keys")
      .then(function(response) {
          $scope._keys = response.data;
          $scope.keys = angular.copy($scope._keys);
          $scope.shuffle();
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
  $scope.start = function(){
    $scope.getKeys(function(){
      $scope.planeswalk();
      $scope.getPlanes();
    });
  }
  $scope.restart = function(){
    $scope.heldPlanes = [];
    $scope.currentPlane = "";
    $scope.keys = window.knuthShuffle($scope._keys);
    $scope.planeswalk();
  }
  $scope.start();
}]);
