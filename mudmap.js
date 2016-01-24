$(document).ready(function() {
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
    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
        }
    });

    // Map setup
    window.projection = ol.proj.get('EPSG:4326');
    $.loadKMI = function(options) {
        options = options || { 
            layer: "dpaw:mapbox_outdoors",
            opacity: 1,
            format: "image/jpeg"
        }
        var tileSize = 1024;
        var projectionExtent = projection.getExtent();
        var size = ol.extent.getWidth(projectionExtent) / tileSize;
        var resolutions = [0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.433227539062E-4, 1.716613769531E-4, 8.58306884766E-5, 4.29153442383E-5, 2.14576721191E-5, 1.07288360596E-5, 5.3644180298E-6, 2.6822090149E-6, 1.3411045074E-6]
        var matrixIds = new Array(18);
        for (var z = 0; z < 18; ++z) { matrixIds[z] = "gda94:" + z; }
        var layer = new ol.layer.Tile({
            opacity: options.opacity || 1,
            source: new ol.source.WMTS({
              url: '/geoserver/gwc/service/wmts',
              layer: options.layer,
              matrixSet: 'gda94',
              format: options.format || 'image/jpeg',
              projection: projection,
              wrapX: true,
              tileGrid: new ol.tilegrid.WMTS({
                origin: ol.extent.getTopLeft(projectionExtent),
                resolutions: resolutions,
                matrixIds: matrixIds,
                tileSize: tileSize
              }),
            })
        });
        return layer
    }

    var initMap = function() {
        window.map = new ol.Map({
            logo: false,
            layers: window.layers,
            renderer: 'canvas',
            target: "map",
            view: new ol.View({ projection: projection, center: [123.750, -24.966], zoom: 5 }),
            controls: ol.control.defaults().extend([
                (new ol.control.ScaleLine()),
            ])
        });
        (new ol.Graticule()).setMap(map);
        map.features = new ol.Collection();
        var defaultColour = '#000';
        map.style = new ol.style.Style({
            fill: new ol.style.Fill({ color: 'rgba(255, 255, 255, 0.2)' }),
            stroke: new ol.style.Stroke({ color: defaultColour, width: 2 }),
            text: new ol.style.Text({
                font: '14px Helvetica',
                textAlign: 'left', 
                offsetX: 8,
                fill: new ol.style.Fill({ color: defaultColour }), 
                stroke: new ol.style.Stroke({ color: '#fff', width: 3 }) 
            })
        });
        map.featureOverlay = new ol.layer.Vector({ 
            source: new ol.source.Vector({ features: map.features }),
            style: function(feature) { 
                if (!feature.get("colour")) { feature.set("colour", defaultColour) }
                map.style.getText().setText(feature.get('label'));
                map.style.stroke_.color_ = feature.get('colour');
                map.style.image_ = new ol.style.Circle({ radius: 4, fill: new ol.style.Fill({ color: feature.get('colour') }) })
                map.style.text_.fill_.color_ = feature.get('colour');
                return map.style;
            }
        });
        map.featureOverlay.setMap(map);
        // Create interactions, add them to map - first modify:
        map.pnt = new ol.interaction.Draw({ features: map.features, type: 'Point' }); map.addInteraction(map.pnt);
        map.lns = new ol.interaction.Draw({ features: map.features, type: 'LineString' }); map.lns.setActive(false); map.addInteraction(map.lns);
        map.pol = new ol.interaction.Draw({ features: map.features, type: 'Polygon' }); map.pol.setActive(false); map.addInteraction(map.pol);
        map.mod = new ol.interaction.Modify({ features: map.features }); map.mod.setActive(false); map.addInteraction(map.mod);
        map.del = new ol.interaction.Select(); map.del.setActive(false); map.addInteraction(map.del);
        map.del.on("select", function(e) { map.features.remove(e.selected[0]); map.del.getFeatures().remove(e.selected[0]); });
        map.lbl = new ol.interaction.Select(); map.lbl.setActive(false); map.addInteraction(map.lbl);
        map.lbl.on("select", function(e) {
            if (!e.selected[0]) { window.alert("Please click a feature to set it's label."); return };
            var label = window.prompt("Label feature (\\n is newline, blank removes label)?", e.selected[0].get('label'));
            e.selected[0].set('label', label);
            map.lbl.getFeatures().remove(e.selected[0]);
        });
        map.col = new ol.interaction.Select(); map.col.setActive(false); map.addInteraction(map.col);
        map.col.on("select", function(e) { 
            if (!e.selected[0]) { window.alert("Please click a feature to set it's colour."); return };
            var colour = window.prompt("Colour feature (try 'red' or '#ff0000' or 'rgba(255,0,0,0.5)')?", e.selected[0].get('colour'));
            e.selected[0].set('colour', colour);
            map.col.getFeatures().remove(e.selected[0]);
        });
        map.deinteract = function() { $.each([map.pnt, map.lns, map.pol, map.mod, map.del, map.lbl, map.col], function(index, ctrl) { ctrl.setActive(false); }) };
        $("ul.controls button").on("click", function() {
            $(this).parents("ul").find("button").addClass('hollow'); $(this).removeClass('hollow')
            map.deinteract(); map[$(this).attr("id")].setActive(true);
        }); 
        window.initMap = undefined;
    }

    if ($.urlParam("ss")) {
        $.get("https://spatialsupport.dpaw.wa.gov.au/apps/spatial/layers.json", function(data) {
            window.ss = JSON.parse(decodeURIComponent($.urlParam('ss')));
            window.layers = []
            $.each(ss.layers, function(index, lyr) {
                if (lyr.layer_id == "resource_tracking_week_base") { lyr.layer_id = "resource_tracking_printable" };
                if (lyr.layer_id == "resource_tracking_week_symbols_overlay") { return };
                var layer = $.grep(data.layers, function(l) { return l.id == lyr.layer_id })[0]
                lyr.layer = layer.layers;
                lyr.format = "image/jpeg"; if (layer.transparent) { lyr.format = "image/png" };
                layers.push($.loadKMI(lyr));
            });
            initMap();
            map.getView().setCenter(ss.center.coordinates);
            map.getView().setZoom(ss.zoom+3)
        });
    } else {
        window.layers = [ $.loadKMI() ]
        initMap();
    }

    // Print stuff
    var exportButton = document.getElementById("export-pdf");
    exportButton.addEventListener("click", function() {
        exportButton.disabled = true;
        document.body.style.cursor = "progress";
        var dim = [ 420, 297 ];
        var width = Math.round(dim[0] * 200 / 25.4);
        var height = Math.round(dim[1] * 200 / 25.4);
        var size = map.getSize();
        var extent = map.getView().calculateExtent(size);
        window.setTimeout(function() {
            var pdf = new jsPDF("landscape", undefined, "a3");
            pdf.addImage($("canvas")[0].toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, dim[0], dim[1]);
            pdf.save("mudmap.pdf");
            map.setSize(size);
            map.getView().fit(extent, size);
            map.renderSync();
            exportButton.disabled = false;
            document.body.style.cursor = "auto";
        }, 5000);
        map.setSize([ width, height ]);
        map.getView().fit(extent, map.getSize());
        map.renderSync();
    }, false);
});
