'use strict';

/**
 * @ngdoc function
 * @name alphatetherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the alphatetherApp
 */
angular.module('alphatetherApp')
    .controller('MainCtrl', function ($scope, $location, CameraImageService, CameraDiscoveryService) {

        CameraDiscoveryService.initialize(function () {
            CameraDiscoveryService.sendSearchRequest();
        });


        $scope.findCamera = function () {
            CameraDiscoveryService.sendSearchRequest();
        };

        /*console.log(cameras);
         $scope.availableCameras = [
         {name: 'A7ii', endpoint: 'http://192.168.122.1:8080'}
         ];
         $scope.selectedCamera = $scope.availableCameras[0];*/

        $scope.setCamera = function (camera) {
            console.info(camera);
            CameraImageService.setCamera(camera);
            $location.path('/camera');
        };
    });
