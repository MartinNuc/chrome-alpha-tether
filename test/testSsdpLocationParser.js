describe("SSDP UDP packet response parser", function () {

    var ssdpLocationParser;

    beforeEach(module("alphatetherApp"));

    beforeEach(inject(function (_SsdpLocationParser_) {
        ssdpLocationParser = _SsdpLocationParser_;
    }));

    it("it should parse out REST endpoint url.", function() {
        var packetBody = "NOTIFY * HTTP/1.1\r\n"
         + "HOST: 239.255.255.250:1900\r\n"
         + "CACHE-CONTROL: max-age=1800\r\n"
         + "LOCATION: http://192.168.122.1:61000/scalarwebapi_dd.xml\r\n"
         + "NT: urn:schemas-sony-com:service:DigitalImaging:1\r\n"
         + "NTS: ssdp:alive\r\n"
         + "SERVER: UPnP/1.0 MINT-X/1.8.1\r\n"
         + "USN: uuid:000000001000-1010-8000-9AF17038CF7C::urn:schemas-sony-com:service:DigitalImaging:1\r\n"
         + "\r\n";
        var result = ssdpLocationParser.parseLocationFromSsdpResponse(packetBody);
        dump(result);
        expect(result).toBe("http://192.168.122.1:61000/scalarwebapi_dd.xml");
    })
});