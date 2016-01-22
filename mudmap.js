$(document).ready(function() {
    window.map = L.map("map", {center: [-24.966, 123.750], zoom: 5});
    map.wmtstemplate = 
    L.TileLayer.KMI = L.TileLayer.extend({
        initialize: function (layer) {
            L.TileLayer.prototype.initialize.call(this, this.url, { layer: layer });
        },
        url: 'https://kmi.dpaw.wa.gov.au/geoserver/gwc/service/tms/1.0.0/{layer}@mercator/{z}/{x}/{y}.png',
        options: {
            attribution: '<a href="https://oim.dpaw.wa.gov.au">KMI</a>',
            tms: true,
            tileSize: 256
        },

    });
    var lyr = new L.TileLayer.KMI('dpaw:mapbox_outdoors')
    lyr.addTo(map);

    L.control.locate().addTo(map);
    L.control.scale().addTo(map);

    map.featureGroup = L.featureGroup().addTo(map)
    map.drawControl = new L.Control.Draw({ edit: { featureGroup: map.featureGroup } }).addTo(map);

    map.on("draw:created", function(e) {
        map.featureGroup.addLayer(e.layer);
        if (e.layer && e.layerType == 'marker') {
            setTimeout(function() {
                var text = window.prompt("Set a label?");
                if (text) {
                    e.layer.bindLabel(text, {
                        noHide: true
                    }).showLabel();
                }
            }, 200);
        } else {
            e.layer.setStyle({
                color: "#000",
                fillColor: "#000"
            });
        }
    });
});
