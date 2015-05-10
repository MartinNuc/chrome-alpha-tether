'use strict';

/**
 * @ngdoc overview
 * @name alphatetherApp
 * @description
 * # alphatetherApp
 *
 * Main module of the application.
 */
angular
    .module('alphatetherApp', [
        'ngRoute',
        'ngSanitize',
        'ui.bootstrap',
        'dialogs.main'
    ])
    .config(function ($routeProvider, $httpProvider) {
        $httpProvider.defaults.headers.post = {};
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/camera', {
                templateUrl: 'views/cameraimage.html',
                controller: 'CameraImageCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
