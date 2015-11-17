angular.module('MagicApp.planechase', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/planechase', {
    templateUrl: 'partials/planechase.html',
    controller: 'PlanechaseCtrl'
  });
}])

.controller('PlanechaseCtrl', ['$scope','$http', '$modal', function($scope,$http,$modal) {

  $scope.shuffle = function(){
    window.knuthShuffle($scope.planes);
  }

  $scope.removePlane = function(plane){
    $scope.planes.splice($scope.planes.indexOf(plane),1);
  }

  $scope.planeswalk = function(){
    if($scope.planes.length > 0){
      $scope.currentPlane = $scope.planes[0];
      $scope.removePlane($scope.currentPlane);
    }
    else{
      $scope.loadPlanes();
    }
  }

  $scope.rollDie = function(){
    var result = Math.floor(Math.random() * 6);
    var toReturn = '';
    switch(result){
      case 0:
        toReturn = 'Planeswalk';
        break;
      case 1:
        toReturn = "Chaos";
        break;
      default:
        toReturn = 'Nothing Happens';
    }
    console.log(toReturn);
  }

  $scope.loadPlanes = function(){
    $http.get("./data/planechase.php").success(function(data){
      $scope.planes = data;
      $scope.shuffle();
      $scope.planeswalk();
    });
  }

  $scope.lookAtTopCard = function(){
     var modalInstance = $modal.open({
      templateUrl: 'lookAtCardModal.html',
      controller: 'LookAtCardModalCtrl',
      resolve: {
        plane: function () {
          return $scope.planes[0];
        }
      }
    });

    modalInstance.result.then(function(action){
      switch(action){
        case 'putOnBottom':
          var t = $scope.planes[0];
          $scope.planes.splice(0,1);
          $scope.planes.push(t);
          break;
      }
    });
  }
  $scope.putOnBottom = function(){
    $scope.planes.push($scope.currentPlane);
    $scope.planeswalk();
  }

  $scope.currentPlane = '';
  $scope.planes = [];

  $scope.loadPlanes();

  //DEBUG

  $scope.listPlanes = function(){
    console.log($scope.planes)
  }


}])
.controller('LookAtCardModalCtrl', function ($scope, $modalInstance, plane) {
  $scope.plane = plane;
  $scope.ok = function () {
    $modalInstance.close();
  };
  $scope.putOnBottom = function () {
    $modalInstance.close('putOnBottom');
  };
});;
