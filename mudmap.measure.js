(function(mudmap) {
    var self = mudmap;

    var wgs84Sphere = new ol.Sphere(6378137);
    /**
     * format length output
     * @param {ol.geom.LineString} line
     * @return {string}
     */
    self.featureLength = function(line) {
        if (line.getType() == "Polygon") {
            var coords = line.getLinearRing(0).getCoordinates();
        } else {
            var coords = line.getCoordinates();
        }
        var length = 0;
        for (var i = 0, ii = coords.length - 1; i < ii; ++i) {
          length += wgs84Sphere.haversineDistance(coords[i], coords[i+1]);
        }
        if (length > 100) {
            var output = (Math.round(length / 1000 * 100) / 100) + ' km';
        } else {
            var output = (Math.round(length * 100) / 100) + ' m';
        }
        return output
    };
    /**
     * format area output
     * @param {ol.geom.Polygon} polygon
     * @return {string}
     */
    self.featureArea = function(polygon) {
        var area = Math.abs(wgs84Sphere.geodesicArea(polygon.getLinearRing(0).getCoordinates()));
        if (area > 10000) {
            var output = (Math.round(area / 10000 * 100) / 100) + ' ha';
        } else {
            var output = (Math.round(area * 100) / 100) + ' m<sup>2</sup>';
        }
        return output;
    };


})(mudmap);
