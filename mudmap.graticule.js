(function(mudmap) {
    var self = mudmap;

    // graticule for printing etc
    var lonFormatter = function(lon) {
        var formattedLon = Math.abs(Math.round(lon * 100) / 100);
        formattedLon += (lon < 0) ? 'W' : ((lon > 0) ? 'E' : '');
        return formattedLon;
    };

    var latFormatter = function(lat) {
        var formattedLat = Math.abs(Math.round(lat * 100) / 100);
        formattedLat += (lat < 0) ? 'S' : ((lat > 0) ? 'N' : '');
        return formattedLat;
    };

    // Create the graticule component
    self.graticule = new ol.Graticule({
        showLabels: true,
        lonLabelFormatter: lonFormatter,
        lonLabelPosition: 0.02,
        latLabelFormatter: latFormatter,
        latLabelPosition: 0.98
    });

    self.on("init_map",function() {
        self.graticule.setMap(self.map);
    });

})(mudmap);
