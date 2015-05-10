angular.module('alphatetherApp')
    .service('SsdpLocationParser', function () {
        var service = {};

        service.parseLocationFromSsdpResponse = function (data) {
            return data.match(/LOCATION: (.*)/)[1];
        };
        return service;
    });