'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/upload', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });
}])

.controller('View1Ctrl', ['$scope', '$http','$timeout','toast', function($scope, $http,$timeout,toast) {

    $scope.imageUpload = function(element) {
        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded;
        $scope.filename = element.files[0].name;
        reader.readAsDataURL(element.files[0]);  
    }

    $scope.validKey = function(){
        return $scope.key != null && $scope.key != '';
    }

    $scope.clearInput =function(){
        $('#img-input').val('');
        $('#image').val('');
        $scope.image = null;
    }

    $scope.imageIsLoaded = function(e) {
        $scope.$apply(function() {
            $scope.image = e.target.result;
            $scope.b64 = $scope.image.split("base64,")[1];
            $timeout(()=>{
                $('#image').faceDetection({
                    complete:function(results){
                        $scope.faceDetected = results.length > 0;
                        $http({
                            method: 'post',
                            url: '/api/file/upload',
                            headers: {
                                'auth':$scope.key,
                                'Content-Type': 'application/json'
                            },
                            data: {
                                containsfaces:$scope.faceDetected,
                                filename: $scope.filename,
                                file: $scope.b64
                            }
                        }).then((res) => {
                            if(res.status == 200){
                                $scope.toastType = "alert-success"    
                                $scope.toastMsg = $scope.faceDetected ? "It's a face!":"It's... something"
                                   
                                toast({
                                    position: 'center',
                                    duration  : 10000,
                                    message   : $scope.toastMsg + "and you've successfuly uploaded it to AWS S3 :)",
                                    className : $scope.toastType
                                  });
                            }
                        }, (err) => {
                            if(err.status == 401){
                                $scope.key = null;
                                $scope.toastType = "alert-danger"    
                                $scope.toastMsg = "your key was invalid, please try a different one"
                                   
                                toast({
                                    position: 'center',
                                    duration  : 10000,
                                    message   : $scope.toastMsg ,
                                    className : $scope.toastType
                                  });
                            }
                        });
                    },error:function(err){
                        $scope.key = null;
                        $scope.toastType = "alert-danger"    
                        $scope.toastMsg = "There was a server error, please try again."
                           
                        toast({
                            position: 'center',
                            duration  : 10000,
                            message   : $scope.toastMsg ,
                            className : $scope.toastType
                          });
                    }
                })
            },0);
        });
    }
}]);