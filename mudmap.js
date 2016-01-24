$(document).ready(function() {
    // to grab stuff from urls
    $.urlParam = function(name, url) {
        if (!url) {
            url = window.location.href;
        }
        var results = new RegExp("[\\?&]" + name + "=([^&#]*)").exec(url);
        if (!results) {
            return undefined;
        }
        return results[1] || undefined;
    };
    // to preserve cookies for CORS requests keeping SSO working
    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
        }
    });
    // Lonlat projection by default with slightly less warped ground pixels
    window.projection = ol.proj.get("EPSG:4326");
    // Convenience loader to create a WMTS layer from a kmi datasource
    $.loadKMI = function(options) {
        options = options || {
            opacity: 1,
            layer: "dpaw:mapbox_outdoors",
            format: "image/jpeg"
        };
        var tileSize = 1024;
        var projectionExtent = projection.getExtent();
        var size = ol.extent.getWidth(projectionExtent) / tileSize;
        var resolutions = [ .17578125, .087890625, .0439453125, .02197265625, .010986328125, .0054931640625, .00274658203125, .001373291015625, .0006866455078125, .0003433227539062, .0001716613769531, 858306884766e-16, 429153442383e-16, 214576721191e-16, 107288360596e-16, 53644180298e-16, 26822090149e-16, 13411045074e-16 ];
        var matrixIds = new Array(18);
        for (var z = 0; z < 18; ++z) {
            matrixIds[z] = "gda94:" + z;
        }
        var layer = new ol.layer.Tile({
            opacity: options.opacity || 1,
            source: new ol.source.WMTS({
                url: "/geoserver/gwc/service/wmts",
                layer: options.layer,
                matrixSet: "gda94",
                format: options.format || "image/jpeg",
                projection: projection,
                wrapX: true,
                tileGrid: new ol.tilegrid.WMTS({
                    origin: ol.extent.getTopLeft(projectionExtent),
                    resolutions: resolutions,
                    matrixIds: matrixIds,
                    tileSize: tileSize
                })
            })
        });
        return layer;
    };
    // Map setup
    var initMap = function() {
        window.map = new ol.Map({
            logo: false,
            layers: window.layers,
            renderer: "canvas",
            target: "map",
            view: new ol.View({
                projection: projection,
                center: [ 123.75, -24.966 ],
                zoom: 5
            }),
            controls: ol.control.defaults().extend([ new ol.control.ScaleLine() ])
        });
        // Testing graticule, needs better labeling =/
        // A standard KMI layer may be better
        // new ol.Graticule().setMap(map);
        map.features = new ol.Collection();
        // default styling for drawn features
        var defaultColour = "#000";
        map.style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(255, 255, 255, 0.2)"
            }),
            stroke: new ol.style.Stroke({
                color: defaultColour,
                width: 2
            }),
            text: new ol.style.Text({
                font: "14px Helvetica",
                textAlign: "left",
                offsetX: 8,
                fill: new ol.style.Fill({
                    color: defaultColour
                }),
                stroke: new ol.style.Stroke({
                    color: "#fff",
                    width: 3
                })
            })
        });
        // overlay which all interactions use
        map.featureOverlay = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: map.features
            }),
            style: function(feature) {
                if (!feature.get("colour")) {
                    feature.set("colour", defaultColour);
                }
                map.style.getText().setText(feature.get("label"));
                map.style.stroke_.color_ = feature.get("colour");
                map.style.image_ = new ol.style.Circle({
                    radius: 4,
                    fill: new ol.style.Fill({
                        color: feature.get("colour")
                    })
                });
                map.style.text_.fill_.color_ = feature.get("colour");
                return map.style;
            }
        });
        map.featureOverlay.setMap(map);
        // Create interactions, add them to map
        $.each({"pnt": "Point", "lns": "LineString", "pol": "Polygon"}, function(key, value) {
            map[key] = new ol.interaction.Draw({
                features: map.features,
                type: value
            });
            map.addInteraction(map[key]);
        });
        map.mod = new ol.interaction.Modify({
            features: map.features
        });
        map.addInteraction(map.mod);
        map.del = new ol.interaction.Select();
        map.addInteraction(map.del);
        map.del.on("select", function(e) {
            map.features.remove(e.selected[0]);
            map.del.getFeatures().remove(e.selected[0]);
        });
        // Label and colour tools just set properties and let style function 
        // handle redraws
        map.lbl = new ol.interaction.Select();
        map.addInteraction(map.lbl);
        map.lbl.on("select", function(e) {
            if (!e.selected[0]) {
                window.alert("Please click a feature to set it's label.");
                return;
            }
            var label = window.prompt("Label feature (\\n is newline, blank removes label)?", e.selected[0].get("label"));
            e.selected[0].set("label", label);
            map.lbl.getFeatures().remove(e.selected[0]);
        });
        map.col = new ol.interaction.Select();
        map.addInteraction(map.col);
        map.col.on("select", function(e) {
            if (!e.selected[0]) {
                window.alert("Please click a feature to set it's colour.");
                return;
            }
            var colour = window.prompt("Colour feature (try 'red' or '#ff0000' or 'rgba(255,0,0,0.5)')?", e.selected[0].get("colour"));
            e.selected[0].set("colour", colour);
            map.col.getFeatures().remove(e.selected[0]);
        });
        map.deinteract = function() {
            $.each([ map.pnt, map.lns, map.pol, map.mod, map.del, map.lbl, map.col ], function(index, ctrl) {
                ctrl.setActive(false);
            });
        };
        $("div.controls .toggle").on("click", function() {
            $("div.controls .toggle").addClass("hollow");
            $(this).removeClass("hollow");
            map.deinteract();
            map[$(this).attr("id")].setActive(true);
        });
        $("#pnt").click();
        window.initMap = undefined;
    };
    // Print stuff
    $("#export-pdf").on("click", function() {
        $(this).prop("disabled", true);
        document.body.style.cursor = "progress";
        // 10 mm shorter than A3 to allow for a text line at bottom
        var dim = [ 420, 287 ];
        var width = Math.round(dim[0] * 200 / 25.4);
        var height = Math.round(dim[1] * 200 / 25.4);
        var size = map.getSize();
        var extent = map.getView().calculateExtent(size);
        window.setTimeout(function() {
            var pdf = new jsPDF("landscape", undefined, "a3");
            // Use jpeg at 0.92 quality for a bit of compression so PDF's aren't huge
            pdf.addImage($("canvas")[0].toDataURL("image/jpeg", .92), "JPEG", 0, 0, dim[0], dim[1]);
            pdf.setFontSize(24)
            pdf.text(2, 295, "SSS Mudmap - " + mapid + ". Printed by " + email + " on <date>")
            pdf.save("mudmap.pdf");
            map.setSize(size);
            map.getView().fit(extent, size);
            map.renderSync();
            $("#export-pdf").prop("disabled", false);
            document.body.style.cursor = "auto";
        }, 5e3);
        map.setSize([ width, height ]);
        map.getView().fit(extent, map.getSize());
        map.renderSync();
    });
    // Initialise with user info
    $.get("/auth", function(userdata) {
        window.email = JSON.parse(userdata).email.toLowerCase();
        // Detect if url to existing mudmap, if not get/create one
        if (!$.urlParam("name")) {
            var name = false;
            while (!name) {
                var name = window.prompt("Get or create mudmap - enter mudmap name:")
            }
            var sep = "?";
            if (window.location.href.search("\\?") > -1) { sep = "&" }
            window.location.href = window.location.href + sep + $.param({"name": name});
        } else {
            window.mapid = name; 
            $("#mapid").text($.urlParam("name") + " (" + email + ")");
        }
        // Load state from url if sent here by sss
        if ($.urlParam("ss")) {
            $.get("https://spatialsupport.dpaw.wa.gov.au/apps/spatial/layers.json", function(data) {
                window.ss = JSON.parse(decodeURIComponent($.urlParam("ss")));
                window.layers = [];
                $.each(ss.layers, function(index, lyr) {
                    if (lyr.layer_id == "resource_tracking_week_base") {
                        lyr.layer_id = "resource_tracking_printable";
                    }
                    if (lyr.layer_id == "resource_tracking_week_symbols_overlay") {
                        return;
                    }
                    var layer = $.grep(data.layers, function(l) {
                        return l.id == lyr.layer_id;
                    })[0];
                    lyr.layer = layer.layers;
                    lyr.format = "image/jpeg";
                    if (layer.transparent) {
                        lyr.format = "image/png";
                    }
                    layers.push($.loadKMI(lyr));
                });
                initMap();
                map.getView().setCenter(ss.center.coordinates);
                // Deal with offset of tilesize from 256 -> 1024 by adding 3 zoomlevels
                map.getView().setZoom(ss.zoom + 3);
            });
        } else {
            window.layers = [ $.loadKMI() ];
            initMap();
        }
    });
});
