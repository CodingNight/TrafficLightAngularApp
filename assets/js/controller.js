var TrafficLight = angular.module('TrafficLight', []);

TrafficLight.controller('TrafficLightCtrl', ['$scope', '$http', function($scope, $http) {
   $http.get('/lights.json').success(function(data) {
        $scope.lights = data;
    });

   $http.get('http://192.168.0.104:3000/ampel/ALLEAUS').success(function(data) {
        var lights = $scope.lights;
        angular.forEach(lights, function(value,key) {
            value.status = 'AUS';
        });
    });

    $scope.toggleLight = function(light) {
       var status = (light.status=='AUS')?'AN':'AUS';
       $http.get('http://192.168.0.104:3000/ampel/' + light.command + status
        ).success(function(data) {
            console.log(data);
            light.status = status;
            light.colorOn = (status == 'AN') ? light.color :'';
            //console.log($scope);
            console.log(light.command);
            $scope.trafficlightStatus = light.command + ' turned '  + ((status =='AUS') ? 'off':'on');
            $scope.trafficlightColor = light.color;
            //console.log('triggered event for ' + light.command);
        });
    }
}]);