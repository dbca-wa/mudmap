"use strict"

var mudmap = new function(){
    var self = this;

    self.geojson = new ol.format.GeoJSON();

    //The application to which the map is belonging.
    self.map_app = null;
    //The name of the current map.
    self.map_name = "default";

    //authenticated user 
    self.user = {};

    //openlayer map object
    self.map = null;

    //default mudmap state 
    self.default_state = {
        layers : [{
            opacity: 1,
            layer: "dpaw:mapbox_outdoors",
            format: "image/jpeg"
        }],
        projection : "EPSG:4326",
        tileSize:1024,
        center : [ 123.75, -24.966 ],
        zoom:5,
        maxZoom:21,
        minZoom:3
    }
    //current map state, if null, default state will be used.
    self.state =  _.defaults({},self.default_state);

    //delay to call a function.
    self.delay = (function(){
      var timer = 0;
      return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
      };
    })();

    //the map key, used to save map state and download map states.
    self.map_key = null;
    //the map key prefix, all named maps sharing the same map key prefix are belonging to the same user and same map application.
    self.map_key_prefix = null;
    //return the map key with the map name
    self.get_map_key = function(name) {
        if (self.map_key_prefix == null) {
            if (self.map_app == null) {
                self.map_key_prefix = "mudmap_" + self.user.email.toLowerCase() + "_";
            } else {
                self.map_key_prefix = "mudmap" + self.map_app + "_" + self.user.email.toLowerCase() + "_";
            }
        }
        return self.map_key_prefix + name;
    }

    //A class maintains a listener pointer and provide a "call" method to call the listeners for the events in the order,
    //This is used when the listener has async logic and need to call the listeners in the async code.
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
            if (typeof e == "ListenerChain") {
                $.each(e.export(),function(index, event_listeners){
                    _listeners.push(event_listeners);
                });
            } else {
                if (typeof e == "string") {
                    e = {"name":e};
                }
                if (e.name in _events) {
                    _listeners.push({"event":e,"listeners":_events[e.name]})
                };
            }
        });

        //export the uncalled listeners in the chain
        self.export = function() {
            var listeners = [];
            var event_index = _event_index;
            var listener_index = _listener_index;

            if (event_index >= _listeners.length) {
                return listeners;
            }
            while(true) {
                while(listener_index >= _listeners[event_index]["listeners"].length) {
                    listener_index = 0;
                    event_index += 1;
                    if (event_index >= _listeners.length) {
                        return listeners;
                    }
                }
                if (listener_index == 0) {
                    listeners.push(_listeners[event_index]);
                } else {   
                    listeners.push({"event":_listeners[event_index].event,"listeners":_listeners[event_index].listeners.slice(listener_index)});
                }
                event_index += 1;
                if (event_index >= _listeners.length) {
                    return listeners;
                }
                listener_index = 0;
            }
        }
        //call the listeners in the chain
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
                var tmp_index = _listener_index;
                _listener_index += 1;
                var ret = _listeners[_event_index]["listeners"][tmp_index](_listeners[_event_index]["event"],self);
                //if (ret != false) {
                //    console.log(_listeners[_event_index]["event"]["name"] + ":" + ret);
                //}
                if (typeof ret != "undefined" && ret == false) {
                    //two conditions:
                    //1. the listener detect some special condition, and no need to call other listener.
                    //2. the listener has aysnc logic and already call the listeners. and no need to call the listeners again.
                    return;
                }
            }
        }
    }

    //the map between event and listeners.
    var _events = {};
    //register a listener or trigger a event.
    //if func is not null, register a event
    //if func is null, trigger a event or a event array.
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

    //how many pixels a millimeter equals to
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

    //upload a file
    //the file can be json file or zip file, this method just trigger a event, the listener will implement the acutal upload logic.
    self.upload = function(file) {
        self.on({"name":"upload","file":file});
    }

    var _changestate_processing = false;
    // called when map is changed.
    //this method will trigger events "changestate","statechanged" and "post_statechanged" in order
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

    //listen to create_map event.
    //create the map and trigger events "init_map","post_init_map","init_map_view" to init the map
    self.on("create_map",function() {
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

        self.on(["load_layers","init_map","init_draw","post_init_map","init_map_view"]);
    });

    //listen to post_init_map event
    //register a map listener to listen to "postrender" event
    self.on("post_init_map",function() {
        self.map.on("postrender", _changestate);
    });

    //init method , called when document ready
    //trigger events "init_app","init_name","create_map","post_init" 
    self.init = function() {
        //get px per mm.
        $("body").append('<div id="px_per_mm" style="width:1mm;display:none"></div>');
        _px_per_mm = parseFloat($('#px_per_mm').width());
        $("#px_per_mm").remove();

        // Initialise with user info
        $.get("/auth", function(userdata) {
            self.user = JSON.parse(userdata);
            self.map_key = self.get_map_key(self.map_name);

            self.on(["init_app","init_name","create_map","post_init"]);
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
