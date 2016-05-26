(function(mudmap) {
    var self = mudmap;

    self.layers = null;

    var _csw_url ="https://oim-uat.dpaw.wa.gov.au/catalogue/{{app}}?request=GetRecords&service=CSW&version=2.0.2&ElementSetName=full&typeNames=csw:Record&outputFormat=application/xml&resultType=results"


    var xml2Json = function(xmlData) {
        var layers = []
        //$(catalog).find("Capability Layer Layer").each(function() {
        $(xmlData.getElementsByTagNameNS('http://www.opengis.net/cat/csw/2.0.2','Record')).each(function() {
            var name = $(this.getElementsByTagNameNS('http://purl.org/dc/elements/1.1/',"identifier")[0]).text();
            var id = name.replace(".", "_");  
            var title = $(this.getElementsByTagNameNS('http://purl.org/dc/elements/1.1/',"title")[0]).text();
            var abstract = $(this.getElementsByTagNameNS('http://purl.org/dc/terms/',"abstract")[0]).text();
            var wfs_url = false;
            var wmts_url = false;
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
                                opacity:1,
                                format : ("format" in scheme)?scheme["format"]:"image/png"
                            }
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
                    "preview_url":preview_url,
                    "selected":false,
                },wmts_parameters);
                layers.push(layer);
            }
        });

        return layers;
    }

    self.on("load_layers",function(e,listener_chain) {
        var url = null;
        if (self.map_app == null) {
            url = _csw_url.replace("{{app}}","");
        } else {
            url = _csw_url.replace("{{app}}",self.map_app + "/");
        }

        $.ajax({
            dataType:'xml',
            type:'GET',
            url:url,
            success: function(data,textStatus,jqXHR) {
                self.layers = xml2Json(data);
                self.on(["layers_loaded",listener_chain]);
            }
        });

        return false;
    });

    // Convenience loader to create a WMTS layer from a kmi datasource
    self.on("init_app",function() {
        self.map_app = null;
        if ($.urlParam("app")) {
            self.map_app = $.urlParam("app");
        } else {
            self.map_app = null;
        }
    });
})(mudmap);
