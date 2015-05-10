var socketId;
var socket = chrome.sockets.udp;

angular.module('alphatetherApp')
    .service('CameraDiscoveryService', function (SsdpLocationParser) {
        var service = {};

        var searchRequest = 'M-SEARCH * HTTP/1.1\r\n' +
            'HOST: 239.255.255.250:1900\r\n' +
            'MAN: "ssdp:discover"\r\n' +
            'MX: 1\r\n' +
            'ST: urn:schemas-sony-com:service:ScalarWebAPI:1\r\n\r\n';
        service.initialize = function (onInitializedCallback, onResponseRecievedCallback) {
            socket.create({}, function (socketInfo) {
                socketId = socketInfo.socketId;
                socket.setMulticastTimeToLive(socketId, 16, function () {
                    socket.setMulticastLoopbackMode(socketId, false, function () {
                        socket.bind(socketId, "0.0.0.0", 1900, function () {
                            var info = socket.getInfo(socketId, function(info) {
                                console.info(info);
                            });
                            socket.joinGroup(socketId, '239.255.255.250', function () {
                                if (onInitializedCallback) {
                                    onInitializedCallback.call();
                                }
                            });
                            chrome.sockets.udp.onReceive.addListener(function(info) {
                                info.data = ab2t(info.data);
                                console.info(info);
                                var xmlUrl = SsdpLocationParser.parseLocationFromSsdpResponse(info.data);
                                onResponseRecievedCallback.call(xmlUrl);
                            });

                            chrome.sockets.udp.onReceiveError.addListener(function (info) {
                                console.log("onReceiveError resultCode=" + info.resultCode);
                            });
                        });
                    });
                });
            })
        };

        service.sendSearchRequest = function () {
            for (var i = 0; i < 3; i++) {
                socket.send(socketId, str2ab(searchRequest),
                    '239.255.255.250', 1900, function (sendInfo) {
                    });
            }
        };

        service.listen = function (onResponseRecievedCallback) {
        };

        return service;

        function str2ab(str) {
            var buffer = new ArrayBuffer(str.length);
            var view = new DataView(buffer);
            for (var i = 0, l = str.length; i < l; i++) {
                view.setInt8(i, str.charAt(i).charCodeAt());
            }
            return buffer;
        }

        function ab2t(buffer /* ArrayBuffer */) {
            var arr = new Int8Array(buffer);
            var str = "";
            for (var i = 0, l = arr.length; i < l; i++) {
                str += String.fromCharCode.call(this, arr[i]);
            }
            return str;
        }
    });