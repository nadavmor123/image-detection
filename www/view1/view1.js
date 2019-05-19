'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/upload', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });
}])

.controller('View1Ctrl', ['$scope', '$http','$timeout', function($scope, $http,$timeout) {

    $scope.errMsgs = [];
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
        $scope.successsMsg = null;
        $scope.errMsgs = [];
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
                                if($scope.faceDetected){
                                    $scope.successsMsg = "It's a FACE! you've successfuly uploaded it to AWS S3!"     
                                }else{
                                    $scope.successsMsg = "It's... SOMETHING! not sure what but you've successfuly uploaded it to AWS S3!" 
                                }
                                $scope.errMsgs = [];
                            }
                        }, (err) => {
                            if(err.status == 401){
                                $scope.errMsgs.push("your supersecret key was invalid. please try a different one.")
                                $scope.key = null;
                                $scope.successsMsg = null;
                            }
                        });
                    },error:function(err){
                        $scope.errMsgs.push("an error has eccured while trying to process your file. please try again.")
                        $scope.successsMsg = null;
                    }
                })
            },0);
        });
    }
}]);