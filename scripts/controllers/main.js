'use strict';

/**
 * @ngdoc function
 * @name alphatetherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the alphatetherApp
 */
angular.module('alphatetherApp')
    .controller('MainCtrl', function ($scope, $http, $location, CameraImageService, CameraDiscoveryService) {

        loadXml("http://192.168.122.1:61000/scalarwebapi_dd.xml");

        function loadXml(xmlLocation) {
            $http.get(xmlLocation).success(function (response) {
                $scope.setCamera('http://192.168.122.1:8080');
            }).error(function () {
                findCameraBySSDP();
            });
        }

        function findCameraBySSDP() {
            CameraDiscoveryService.initialize(function () {
                CameraDiscoveryService.sendSearchRequest();
            }, function (xmlLocation) {
                if (xmlLocation != null) {
                    loadXml(xmlLocation);
                    console.debug("XML Location======> " + xmlLocation);
                }
            });
        }

        $scope.findCamera = function () {
            CameraDiscoveryService.sendSearchRequest();
        };

        $scope.setCamera = function (endpoint) {
            CameraImageService.setCamera({endpoint: endpoint});
            $location.path('/camera');
        };
    });
