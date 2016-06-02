(function(mudmap) {
    var self = mudmap;

    var _cswUrl ="https://oim-uat.dpaw.wa.gov.au/catalogue/{{app}}?request=GetRecords&service=CSW&version=2.0.2&ElementSetName=full&typeNames=csw:Record&outputFormat=application/xml&resultType=results"

    var _matrixSets = {
        "EPSG:4326" : {
            "1024":{
                "name":"gda94",
                "resolutions" : [ .17578125, .087890625, .0439453125, .02197265625, .010986328125, .0054931640625, .00274658203125, .001373291015625, .0006866455078125, .0003433227539062, .0001716613769531, 858306884766e-16, 429153442383e-16, 214576721191e-16, 107288360596e-16, 53644180298e-16, 26822090149e-16, 13411045074e-16 ],
                "minLevel" : 0,
                "maxLevel" : 17,
            }
        },
    }

    $.each(_matrixSets,function(projection,innerMatrixSets){
        $.each(innerMatrixSets,function(tileSize,matrixSet){
            var matrixIds = new Array(matrixSet.maxLevel - matrixSet.minLevel + 1);
            for (var z = matrixSet.minLevel; z <= matrixSet.maxLevel; ++z) {
                matrixIds[z] =  matrixSet.name + ":" + z;
            }
            matrixSet.matrixIds = matrixIds;
        });
    });

    self.defaultLayer = {
        opacity: 80,
        name: "dpaw:mapbox_outdoors",
        format: "image/jpeg",
        tileSize:1024,
        projection:"EPSG:4326",
        wmts_url: "https://kmi.dpaw.wa.gov.au/geoserver/gwc/service/wmts",
    };
    // Convenience loader to create a WMTS layer from a kmi datasource
    self.create_tile_layer = function(layer) {
        layer = layer || {};
        _.defaults(layer,self.defaultLayer);

        var matrixSet =  _matrixSets[layer.projection][layer.tileSize];
        var tileLayer = new ol.layer.Tile({
            opacity: (layer.opacity || 100) / 100,
            source: new ol.source.WMTS({
                url: layer.wmts_url,
                crossOrigin: 'https://' + window.location.hostname,
                layer: layer.name,
                matrixSet: matrixSet.name,
                format: layer.format,
                projection: layer.projection,
                wrapX: true,
                tileGrid: new ol.tilegrid.WMTS({
                    origin: ol.extent.getTopLeft([ -180, -90, 180, 90 ]),
                    resolutions: matrixSet.resolutions,
                    matrixIds: matrixSet.matrixIds,
                    tileSize: layer.tileSize
                })
            })
        });
        tileLayer.setZIndex(layer.zindex);
        return tileLayer;
    }

    var xml2Json = function(xmlData) {
        var layers = []
        //$(catalog).find("Capability Layer Layer").each(function() {
        $(xmlData.getElementsByTagNameNS('http://www.opengis.net/cat/csw/2.0.2','Record')).each(function() {
            var name = $(this.getElementsByTagNameNS('http://purl.org/dc/elements/1.1/',"identifier")[0]).text();
            var id = name.replace(".", "_").replace(":","_");  
            var title = $(this.getElementsByTagNameNS('http://purl.org/dc/elements/1.1/',"title")[0]).text();
            var abstract = $(this.getElementsByTagNameNS('http://purl.org/dc/terms/',"abstract")[0]).text();
            var wfs_url = false;
            var wmts_url = false;
            var wms_url = false;
            var wmts_parameters = null;
            var preview_url = false;
            function init_url(url) {
                if( url.charAt(url.length - 1) == "?" || url.charAt(url.length - 1) == "&") {
                    return url
                } else if (url.indexOf("?") >= 0) {
                    return url + "&";
                } else {
                    return url + "?"
                }
            }
            $(this.getElementsByTagNameNS('http://purl.org/dc/terms/',"references")).each(function() {
                try {
                    var scheme = null;
                    var params = null;
                    scheme = JSON.parse($(this).attr("scheme").replace(/&quot;/g,'"'))
                    if (scheme["protocol"] == "OGC:WFS") {
                        wfs_url = init_url(scheme["linkage"]);
                        params = {
                            service:"wfs",
                            version:scheme["version"],
                        }
                        if (params["version"] == "2.0.0") {
                            params["typeName"] = name;
                        } else {
                            params["typeName"] = name;
                        }
                        wfs_url = init_url(wfs_url + $.param(params))
                    }
                    else if (scheme["protocol"] == "OGC:WMS") {
                        if (("width" in scheme && scheme["width"] == self.state.tileSize.toString()) && ("crs" in scheme && scheme["crs"] == self.state.projection)) {
                            var pos = scheme["linkage"].search("/geoserver");
                            wmts_url = scheme["linkage"].substr(0,pos) + "/geoserver/gwc/service/wmts";
                            wmts_parameters = {
                                tileSize:self.state.tileSize,
                                projection:self.state.projection,
                                format : ("format" in scheme)?scheme["format"]:"image/png"
                            }
                            wms_url = init_url(scheme["linkage"]);
                            params = {
                                service:"wms",
                                version:scheme["version"],
                                layers:name
                            }
                            wms_url = init_url(wms_url + $.param(params));
                            preview_url = $(this).text();
                        }
                    } 
                }
                catch(err) {
                    //ignore
                }
            });
            if (wmts_url) {
                var layer = _.extend({
                    "name": name,
                    "id": id, 
                    "title": title.replace(/_/g, " "),
                    "abstract": abstract,
                    "wfs_url": wfs_url,
                    "wmts_url":wmts_url,
                    "wms_url":wms_url,
                    "preview_url":preview_url,
                },wmts_parameters);
                layers.push(layer);
            }
        });

        return layers;
    }

    self.on("load_layers",function(e,listener_chain) {
        var url = null;
        if (self.application == null) {
            url = _cswUrl.replace("{{app}}","");
        } else {
            url = _cswUrl.replace("{{app}}",self.application + "/");
        }

        $.ajax({
            dataType:'xml',
            type:'GET',
            url:url,
            success: function(data,textStatus,jqXHR) {
                self.layers = xml2Json(data);
                listener_chain.call();
            }
        });

        return false;
    });

})(mudmap);
