'use strict';

/**
 * @ngdoc service
 * @name alphatetherApp.CameraImageService
 * @description
 * # CameraImageService
 * Service in the alphatetherApp.
 */
angular.module('alphatetherApp')
    .service('CameraImageService', function ($http) {
        var service = {};
        var camera = {};
        var requestCounter = 1;

        function getRequestId() {
            return requestCounter++;
        }

        service.setCamera = function (selectedCamera) {
            camera = selectedCamera;
        };

        service.getCamera = function () {
            return camera;
        };

        service.startRecMode = function () {
            var param = {method: 'startRecMode', params: [], id: getRequestId(), version: '1.0'};
            return $http.post(camera.endpoint + '/sony/camera', param);
        };

        service.stopRecMode = function () {
            var param = {method: 'stopRecMode', params: [], id: getRequestId(), version: '1.0'};
            return $http.post(camera.endpoint + '/sony/camera', param);
        };

        service.checkForNewImage = function () {
            var param = {method: 'getEvent', params: [true], id: getRequestId(), version: '1.0'};
            return $http.post(camera.endpoint + '/sony/camera', param);
        };

        return service;
    });
