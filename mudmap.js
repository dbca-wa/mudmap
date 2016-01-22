L.mapbox.accessToken = "pk.eyJ1IjoiZHBhd2FzaSIsImEiOiJtVjY5WmlFIn0.whc76euXLk2PkyxOkZ5xlQ";

var map = L.mapbox.map("map", "mapbox.outdoors", {
    center: [ -24.966, 123.75 ],
    zoom: 5
});

L.control.locate().addTo(map);

L.control.scale().addTo(map);

var featureGroup = L.featureGroup().addTo(map);

map.on("draw:drawstop", function(e) {});

var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: featureGroup
    }
}).addTo(map);

map.on("draw:created", function(e) {
    featureGroup.addLayer(e.layer);
    if (e.layer && e.layer.bindLabel) {
        setTimeout(function() {
            var text = window.prompt("Set a label?");
            if (text) {
                e.layer.bindLabel(text, {
                    noHide: true
                });
            }
            if (e.layer.showLabel) {
                e.layer.showLabel();
            } else {
                e.layer.setStyle({
                    color: "#000",
                    fillColor: "#000"
                });
                var area = L.GeometryUtil.readableArea(L.GeometryUtil.geodesicArea(e.layer.getLatLngs()), true);
                var distance = 0;
                var latlngs = e.layer.getLatLngs();
                e.layer.bindPopup("area: " + area + "<br>distance: " + distance).showPopup();
            }
        }, 200);
    }
}).on("ready", function() {
    new L.Control.MiniMap(L.mapbox.tileLayer("mapbox.outdoors")).addTo(map);
});