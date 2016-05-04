angular.module('weatherApp',[])
.controller("weatherController",function($scope){
$scope.description = "a simple weather app"	;
})
  .directive("weather", function() {
    return{ 
      restrict: "A",
      templactURL: "weather.html"
    }
});
