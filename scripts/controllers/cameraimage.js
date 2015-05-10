'use strict';

/**
 * @ngdoc function
 * @name alphatetherApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the alphatetherApp
 */
angular.module('alphatetherApp')
    .controller('CameraImageCtrl', function ($scope, $location, $interval, dialogs, CameraImageService) {
        $scope.imageSource = "";
        $scope.camera = CameraImageService.getCamera();
        if (Object.keys($scope.camera).length === 0) {
            $location.path('/');
        }

        CameraImageService.stopRecMode().success(function () {
            CameraImageService.startRecMode().success(function (response) {
                if (response.result[0] === 0) {
                    $interval(checkForNewImage, 1500);
                } else {
                    console.debug(response);
                }
            }).error(function () {
                error('Error starting camera');
            });
        }).error(function () {
            error('Error starting camera');
        });

        function loadImage(takePictureUrl) {
            $scope.imageSource = takePictureUrl;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', takePictureUrl, true);
            xhr.responseType = 'blob';
            xhr.onload = function(e) {
                $scope.imageSource = window.URL.createObjectURL(this.response);
            };
            xhr.send();
        }

        function checkForNewImage() {
            CameraImageService.checkForNewImage().success(function (response) {
                if (response.result && response.result[5] && response.result[5][0] && response.result[5][0].takePictureUrl) {
                    loadImage(response.result[5][0].takePictureUrl[0]);
                }
            }).error(function () {
                error('Error during communication');
            });
        }

        function error(text) {
            dialogs.error("Error", text);
            $location.path('/');
        }
    });
