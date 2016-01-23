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
            layers: window.layers,
            renderer: 'canvas',
            target: "map",
            view: new ol.View({ projection: projection, center: [123.750, -24.966], zoom: 5 })
        });
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
        });
    } else {
        window.layers = [ $.loadKMI() ]
        initMap();
    }

    // Print stuff
    var dims = {
        a0: [ 1189, 841 ],
        a1: [ 841, 594 ],
        a2: [ 594, 420 ],
        a3: [ 420, 297 ],
        a4: [ 297, 210 ],
        a5: [ 210, 148 ]
    };
    var exportButton = document.getElementById("export-pdf");
    exportButton.addEventListener("click", function() {
        exportButton.disabled = true;
        document.body.style.cursor = "progress";
        var format = document.getElementById("format").value;
        var resolution = document.getElementById("resolution").value;
        var dim = dims[format];
        var width = Math.round(dim[0] * resolution / 25.4);
        var height = Math.round(dim[1] * resolution / 25.4);
        var size = map.getSize();
        var extent = map.getView().calculateExtent(size);
        window.setTimeout(function() {
            var pdf = new jsPDF("landscape", undefined, format);
            $("canvas").each(function() {
                var data = this.toDataURL("image/jpeg", 0.9);
                pdf.addImage(data, "JPEG", 0, 0, dim[0], dim[1]);
            });
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
