"use strict"

var mudmap = new function(){
    var self = this;

    self.geojson = new ol.format.GeoJSON();

    self.map_app = null;
    self.map_name = null;

    //authenticated user 
    self.user = {};

    //openlayer map object
    self.map = null;

    //mudmap state 
    self.default_state = {
        layers : [{
            opacity: 1,
            layer: "dpaw:mapbox_outdoors",
            format: "image/jpeg"
        }],
        projection : "EPSG:4326",
        center : [ 123.75, -24.966 ],
        zoom:5,
        maxZoom:21,
        minZoom:3
    }
    self.state =  null;

    self.delay = (function(){
      var timer = 0;
      return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
      };
    })();

    self.ListenerChain = function(events) {
        var self = this;
        //the next listener's event index;
        var _event_index = 0;
        //the next listener's listener index.
        var _listener_index = 0;

        if (!(events instanceof Array)) {
            events = [events];
        }

        var _listeners = [];
        $.each(events, function(index,e) {
            if (typeof e == "string") {
                e = {"name":e};
            }
            if (e.name in _events) {
                _listeners.push({"event":e,"listeners":_events[e.name]})
            };
        });

        self.call = function() {
            if (_event_index >= _listeners.length) {
                return ;
            }
            while(true) {
                while(_listener_index >= _listeners[_event_index]["listeners"].length) {
                    _listener_index = 0;
                    _event_index += 1;
                    if (_event_index >= _listeners.length) {
                        return ;
                    }
                }
                var ret = _listeners[_event_index]["listeners"][_listener_index](_listeners[_event_index]["event"],self);
                if (ret != false) {
                    console.log(_listeners[_event_index]["event"]["name"] + ":" + ret);
                }
                if (typeof ret != "undefined" && ret == false) {
                    //two conditions:
                    //1. the listener detect some special condition, and no need to call other listener.
                    //2. the listener has aysnc logic and already call the listeners. and no need to call the listeners again.
                    _listener_index += 1;
                    return;
                } else {
                    _listener_index += 1;
                }
            }
        }
    }

    var _events = {};
    self.on = function(e,func) {
        if(func == null || typeof func == "undefined") {
            //trigger event mode
            var listener_chain = new self.ListenerChain(e);
            listener_chain.call();
        } else {
            //register listener mode
            if (!(e in _events)) {
                _events[e] = [];
            }
            _events[e].push(func);
        }
    }

    var _px_per_mm = null;
    /*
     * len: length in mm
     * return length in pixels
     */
    self.toPixel = function(len) {
        return Math.floor(len * _px_per_mm);
    }

    /*
     * len: length in pixels
     * return length in millimeter
     */
    self.toMillimeter = function(len) {
        return len / _px_per_mm;
    }

    self.upload = function(file) {
        self.on({"name":"upload","file":file});
    }

    // Download map
    self.download = function() {
        document.body.style.cursor = "progress";
        var zip = new JSZip();
        zip.file("mudmap.json", JSON.stringify(self.state));
        var content = zip.generate({
            type: "blob",
            compression: "DEFLATE"
        });
        saveAs(content, "p&w_mudmap_" + self.map_name + "_" + self.state.lastsave + ".zip");
        document.body.style.cursor = "auto";
    }

    // Save history into localforage
    var _changestate_processing = false;
    var _changestate = function() {
        if (_changestate_processing) {
            return;
        }
        _changestate_processing = true;
        setTimeout(function() {
            self.state.zoom = self.map.getView().getZoom();
            self.state.resolution = self.map.getView().getResolution();
            self.state.center = self.map.getView().getCenter();
            self.on(["changestate","statechanged","post_statechanged"]);
        }, 100);
    };

    self.on("post_statechanged",function() {
        _changestate_processing = false;
    })

    // Convenience loader to create a WMTS layer from a kmi datasource
    self.create_tile_layer = function(args) {
        var options = {
            opacity: 1,
            layer: "dpaw:mapbox_outdoors",
            format: "image/jpeg"
        };
        if (args) {
            $.extend(options, args);
        }
        var tileSize = 1024;
        var size = ol.extent.getWidth([ -180, -90, 180, 90 ]) / tileSize;
        var resolutions = [ .17578125, .087890625, .0439453125, .02197265625, .010986328125, .0054931640625, .00274658203125, .001373291015625, .0006866455078125, .0003433227539062, .0001716613769531, 858306884766e-16, 429153442383e-16, 214576721191e-16, 107288360596e-16, 53644180298e-16, 26822090149e-16, 13411045074e-16 ];
        var matrixIds = new Array(18);
        for (var z = 0; z < 18; ++z) {
            matrixIds[z] = "gda94:" + z;
        }
        var layer = new ol.layer.Tile({
            opacity: options.opacity || 1,
            source: new ol.source.WMTS({
                url: "https://kmi.dpaw.wa.gov.au/geoserver/gwc/service/wmts",
                crossOrigin: 'https://' + window.location.hostname,
                layer: options.layer,
                matrixSet: "gda94",
                format: options.format || "image/jpeg",
                projection: "EPSG:4326",
                wrapX: true,
                tileGrid: new ol.tilegrid.WMTS({
                    origin: ol.extent.getTopLeft([ -180, -90, 180, 90 ]),
                    resolutions: resolutions,
                    matrixIds: matrixIds,
                    tileSize: tileSize
                })
            })
        });
        return layer;
    }

    /*
     * init the map
     */
    var _initMap = function() {
        if (self.state == null) {
            self.state =  _.defaults({},self.default_state);
        }
        self.map = new ol.Map({
            logo: false,
            layers: $.map(self.state.layers,self.create_tile_layer),
            renderer: "canvas",
            target: "map",
            view: new ol.View({
                projection: self.state.projection,
                center: self.state.center,
                zoom: self.state.zoom,
                resolution:self.state.resolution,
                maxZoom: self.state.maxZoom,
                minZoom: self.state.minZoom
            }),
            controls: ol.control.defaults().extend([
                new ol.control.ScaleLine(),
                new ol.control.MousePosition({
                    projection: self.state.projection,
                    coordinateFormat: function(coord) {
                        return ol.coordinate.toStringHDMS(coord);
                    }
                }),
            ])
        });

        self.on(["init_map","post_init_map","init_map_view"]);
    }

    self.on("post_init_map",function() {
        self.map.on("postrender", _changestate);
    });

    self.init = function() {
        //get px per mm.
        $("body").append('<div id="px_per_mm" style="width:1mm;display:none"></div>');
        _px_per_mm = parseFloat($('#px_per_mm').width());
        $("#px_per_mm").remove();

        // Initialise with user info
        $.get("/auth", function(userdata) {
            self.user = JSON.parse(userdata);

            self.on("init",_initMap);
            //call hooked init functions.
            self.on("init");
        });

    }
}();


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
    mudmap.init();
});
