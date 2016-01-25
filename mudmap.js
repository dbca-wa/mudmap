$(document).ready(function() {
    $(document).foundation();
    // to grab stuff from urls
    $.urlParam = function(name, url) {
        if (!url) {
            url = window.location.href;
        }
        var results = new RegExp("[\\?&]" + name + "=([^&#]*)").exec(url);
        if (!results) {
            return undefined;
        }
        return decodeURIComponent(results[1]) || undefined;
    };
    // to preserve cookies for CORS requests keeping SSO working
    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
        }
    });
    // Lonlat projection by default with slightly less warped ground pixels
    window.projection = ol.proj.get("EPSG:4326");
    window.geojson = new ol.format.GeoJSON();
    // Convenience loader to create a WMTS layer from a kmi datasource
    $.loadKMI = function(args) {
        var options = {
            opacity: 1,
            layer: "dpaw:mapbox_outdoors",
            format: "image/jpeg"
        };
        if (args) {
            $.extend(options, args);
        }
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
        $("#colour button").on("click", function() {
            window.colour = $(this).css("background-color");
            $("#colourbutton").css({
                "background-color": colour
            }).click();
            $("#col").click();
        });
        window.colour = $("#colourbutton").css("background-color");
        map.style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(255, 255, 255, 0.2)"
            }),
            stroke: new ol.style.Stroke({
                color: colour,
                width: 2
            }),
            text: new ol.style.Text({
                font: "14px sans-serif",
                textAlign: "left",
                offsetX: 8,
                fill: new ol.style.Fill({
                    color: colour
                }),
                stroke: new ol.style.Stroke({
                    color: "rgba(255, 255, 255, 0.7)",
                    width: 4
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
                    feature.set("colour", colour);
                }
                if (!feature.get("label")) {
                    feature.set("label", "");
                }
                map.style.getText().setText(feature.get("label"));
                map.style.stroke_.color_ = feature.get("colour");
                map.style.image_ = new ol.style.Circle({
                    radius: 4,
                    fill: new ol.style.Fill({
                        color: feature.get("colour")
                    }),
                    stroke: new ol.style.Stroke({
                        color: "rgba(255, 255, 255, 0.7)",
                        width: 2
                    })
                });
                map.style.text_.fill_.color_ = feature.get("colour");
                return map.style;
            }
        });
        map.featureOverlay.setMap(map);
        // Create interactions, add them to map
        $.each({
            pnt: "Point",
            lns: "LineString",
            pol: "Polygon"
        }, function(key, value) {
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
            if (label) {
                e.selected[0].set("label", label);
            }
            map.lbl.getFeatures().remove(e.selected[0]);
        });
        map.col = new ol.interaction.Select();
        map.addInteraction(map.col);
        map.col.on("select", function(e) {
            if (!e.selected[0]) {
                window.alert("Please click a feature to set it's colour.");
                return;
            }
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
            if ($(this).attr("id") != "pan") {
                map[$(this).attr("id")].setActive(true);
            }
        });
        // Save history into localforage
        map.saveversion = function() {
            if (map.features.array_.length == 0) {
                return;
            }
            setTimeout(function() {
                var currentfeatures = geojson.writeFeatures(map.features.array_);
                map.savedstate.lastsave = moment().format();
                if (!map.savedstate.features) {
                    map.savedstate.features = currentfeatures;
                } else if (currentfeatures != map.savedstate.features) {
                    map.savedstate.history = map.savedstate.history || [];
                    // max 100 history
                    map.savedstate.history = map.savedstate.history.slice(-100);
                    map.savedstate.history.push(map.savedstate.features);
                    map.savedstate.features = currentfeatures;
                }
                localforage.setItem(foragekey, map.savedstate);
                $("#mapid").text(mapid + " (" + email + ") saved " + map.savedstate.lastsave);
                if (map.features.array_.length) {
                    $("#numfeatures").text(" (" + map.features.array_.length + ")");
                }
                if (map.savedstate.history) {
                    $("#undos").text(" (" + map.savedstate.history.length + ")");
                }
                if (map.savedstate.redo) {
                    $("#redos").text(" (" + map.savedstate.redo.length + ")");
                }
            }, 100);
        };
        $("#upload").on("change", function() {
            var file = $(this).prop("files")[0];
            var reader = new FileReader();
            reader.onload = function(f) {
                if (file.name.endsWith(".zip")) {
                    window.mapzip = new JSZip(f.target.result);
                    if (mapzip.files["mudmap.json"] && confirm("Replace current mudmap with " + file.name + " ?")) {
                        localforage.setItem(foragekey, JSON.parse(mapzip.files["mudmap.json"].asText())).then(function() {
                            // reload to init from uploaded file
                            window.location.reload();
                        });
                    } else {
                        alert("This zipfile didn't contain mudmap.json =(");
                    }
                } else if (file.name.endsWith("json")) {
                    if (confirm("Add features from " + file.name + " to mudmap?")) {
                        window.filename = f;
                        map.features.extend(geojson.readFeatures(f.target.result));
                    }
                }
            };
            if (file.name.endsWith(".zip")) {
                reader.readAsArrayBuffer(file);
            } else {
                reader.readAsText(file);
            }
        });
        $("#zoom").on("click", function() {
            map.getView().fit(map.featureOverlay.getSource().getExtent(), map.getSize());
        });
        $("#undo").on("click", function() {
            map.features.clear();
            map.savedstate.redo = map.savedstate.redo || [];
            map.savedstate.redo.push(map.savedstate.history.pop());
            map.features.extend(geojson.readFeatures(map.savedstate.history.pop()));
        });
        $("#redo").on("click", function() {
            if (map.savedstate.redo && map.savedstate.redo.length > 0) {
                map.features.clear();
                map.features.extend(geojson.readFeatures(map.savedstate.redo.pop()));
            }
        });
        $("#pan").click();
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
        map.deinteract();
        map.setSize([ width, height ]);
        map.getView().fit(extent, map.getSize());
        map.renderSync();
        window.setTimeout(function() {
            var pdf = new jsPDF("landscape", undefined, "a3");
            // Use jpeg at 0.92 quality for a bit of compression so PDF's aren't huge
            pdf.addImage($("canvas")[0].toDataURL("image/jpeg", .92), "JPEG", 0, 0, dim[0], dim[1]);
            pdf.setFontSize(24);
            pdf.text(2, 295, "SSS Mudmap - " + mapid + " (" + email + ") modified " + map.savedstate.lastsave);
            pdf.save(foragekey + "_" + map.savedstate.lastsave + ".pdf");
            map.setSize(size);
            map.getView().fit(extent, size);
            map.renderSync();
            document.body.style.cursor = "auto";
            $("#export-pdf").prop("disabled", false);
        }, 5e3);
    });
    // Download map
    $("#download").on("click", function() {
        document.body.style.cursor = "progress";
        var zip = new JSZip();
        zip.file("mudmap.json", JSON.stringify(map.savedstate));
        var content = zip.generate({
            type: "blob",
            compression: "DEFLATE"
        });
        saveAs(content, "p&w_mudmap_" + mapid + "_" + map.savedstate.lastsave + ".zip");
        document.body.style.cursor = "auto";
    });
    $("#export-json").on("click", function() {
        var jsonblob = new Blob(map.savedstate.history.slice(-1), {
            type: "application/vnd.geo+json;charset=utf-8"
        });
        saveAs(jsonblob, "p&w_mudmap_" + mapid + "_" + map.savedstate.lastsave + ".json");
    });
    // Initialise with user info
    $.get("/auth", function(userdata) {
        window.email = JSON.parse(userdata).email.toLowerCase();
        // Detect if url to existing mudmap, if not get/create one
        if (!$.urlParam("name")) {
            var name = false;
            while (!name) {
                var name = window.prompt("Get or create mudmap - enter mudmap name:");
            }
            window.foragekey = email + "_map_" + $.param({name: name}).slice(5);
            if ($.urlParam("ss")) {
                $.get("https://spatialsupport.dpaw.wa.gov.au/apps/spatial/layers.json", function(data) {
                    window.ss = JSON.parse(decodeURIComponent($.urlParam("ss")));
                    var layers = [];
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
                        layers.push(lyr);
                    });
                    localforage.getItem(foragekey, function(state) {
                        // If this is an existing map, just swap out the baselayers
                        if (state) {
                            $.extend(state, {
                                layers: layers
                            });
                            localforage.setItem(email + "_map_" + name, state).then(function() {
                                // Reload page with just mapid
                                window.location.search = "?" + $.param({
                                    name: name
                                });
                            });
                        } else {
                            localforage.setItem(foragekey, {
                                layers: layers,
                                center: ss.center.coordinates,
                                // Deal with offset of tilesize from 256 -> 1024 by adding 3 zoomlevels
                                zoom: ss.zoom + 3
                            }).then(function() {
                                // Reload page with just mapid
                                window.location.search = "?" + $.param({
                                    name: name
                                });
                            });
                        }
                    });
                });
            } else {
                // Default map
                window.location.search = "?" + $.param({
                    name: name
                });
            }
        } else {
            window.mapid = $.urlParam("name");
            window.foragekey = email + "_map_" + mapid;
            localforage.getItem(foragekey).then(function(state) {
                if (state) {
                    if (state.layers) {
                        window.layers = $.map(state.layers, $.loadKMI);
                    } else {
                        window.layers = [ $.loadKMI() ];
                    }
                    initMap();
                    map.getView().setCenter(state.center);
                    map.getView().setZoom(state.zoom);
                    if (state.features) {
                        map.once("postrender", function() {
                            map.features.extend(geojson.readFeatures(state.features));
                            map.savedstate = state;
                            $("#zoom").click();
                            map.on("postrender", map.saveversion);
                            $("#mapid").text(mapid + " (" + email + ") loaded " + state.lastsave);
                        });
                    } else {
                        map.savedstate = state;
                        map.on("postrender", map.saveversion);
                        $("#mapid").text(mapid + " (" + email + ") loaded " + state.lastsave);
                    }
                } else {
                    window.layers = [ $.loadKMI() ];
                    initMap();
                    map.savedstate = {
                        center: map.getView().getCenter(),
                        zoom: map.getView().getZoom()
                    };
                    localforage.setItem(foragekey, map.savedstate);
                    map.on("postrender", map.saveversion);
                    $("#mapid").text(mapid + " (" + email + ") new");
                }
            });
        }
    });
});
