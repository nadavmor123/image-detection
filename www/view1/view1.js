'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
    $scope.imageUpload = function(element) {
        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded;
        reader.readAsDataURL(element.files[0]);
    }

    $scope.imageIsLoaded = function(e) {
        $scope.$apply(function() {
            $scope.image = e.target.result;

            $scope.b64 = $scope.image.split("base64,")[1];

            $http({
                method: 'post',
                url: '/api/file/upload2',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    originalName: "test",
                    file: $scope.b64
                }
            }).then((res) => {
                console.log(res)
            }, (err) => {
                console.log(err)
            });
        });

    }
}]);