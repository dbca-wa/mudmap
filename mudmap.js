$(document).ready(function() {
    // to help extract queries
    $.urlParam = function(name, url) {
        if (!url) {
         url = window.location.href;
        }
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
        if (!results) {
            return undefined;
        }
        return results[1] || undefined;
    }

    // cors stuff
    $.ajaxSetup({ xhrFields: { withCredentials: true } });

    // mudmap setup
    crs = new L.Proj.CRS("EPSG:4283","+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs", {
        resolutions: [0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.433227539062E-4, 1.716613769531E-4, 8.58306884766E-5, 4.29153442383E-5, 2.14576721191E-5, 1.07288360596E-5, 5.3644180298E-6, 2.6822090149E-6, 1.3411045074E-6],
        origin: [180, 90]
    });
    window.map = L.map("map", { center: [-24.966, 123.750], zoom: 5});
    map.wmtstemplate = 
    L.TileLayer.KMI = L.TileLayer.extend({
        initialize: function (options) {
            L.TileLayer.prototype.initialize.call(this, this.url, options);
        },
        url: 'https://kmi.dpaw.wa.gov.au/geoserver/gwc/service/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=' +
             '{layer}&STYLE=_null&FORMAT=image/{fmt}&TILEMATRIXSET={gridset}&TILECOL={x}&TILEROW={y}&TILEMATRIX={gridset}:{z}',
        options: {
            attribution: '<a href="https://oim.dpaw.wa.gov.au/it-systems-register/details/?system_id=S060">KMI</a>',
            tileSize: 1024,
            continuousWorld: true,
            gridset: "gda94",
            zoomOffset: -2
        },

    });
    if ($.urlParam('ss')) {
        window.ss = JSON.parse(decodeURIComponent($.urlParam('ss')));
        $.get("https://spatialsupport.dpaw.wa.gov.au/apps/spatial/layers.json", function(data) {
            map.setZoom(ss.zoom+2);
            map.panTo(ss.center.coordinates.reverse());
            $.each(ss.layers, function(index, lyr) {
                if (lyr.layer_id == "resource_tracking_week_base") { lyr.layer_id = "resource_tracking_printable" };
                if (lyr.layer_id == "resource_tracking_week_symbols_overlay") { return };
                var layer = $.grep(data.layers, function(l) { return l.id == lyr.layer_id })[0]
                var fmt = "jpeg"; if (layer.transparent) { fmt = "png" };
                (new L.TileLayer.KMI({ layer:layer.layers, fmt:fmt, opacity:lyr.opacity })).addTo(map);
            });
        });
    } else {
        (new L.TileLayer.KMI({ layer:'dpaw:mapbox_outdoors', fmt:'png' })).addTo(map);
    }

    L.control.locate().addTo(map);
    //L.control.scale({imperial: false}).addTo(map);

    map.featureGroup = L.featureGroup().addTo(map)
    map.drawControl = new L.Control.Draw({ edit: { featureGroup: map.featureGroup }, draw: { rectangle: false, circle: false } }).addTo(map);

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
