"use strict"

var mudmap = new function(){
    var self = this;

    self.geojson = new ol.format.GeoJSON();

    //The application to which the map is belonging.
    self.application = null;
    //The name of the current map.
    self.mapName = "default";

    //authenticated user 
    self.user = {};

    //openlayer map object
    self.map = null;
    self.layers = null;

    //inlude all supported interacts
    self.interacts = {};

    //current active interact. 
    //only one interact is active at any time.
    var _activeInteract = null;

    //set all interacts inactive.
    self.deinteract = function() {
        self.activeInteract(null);
    }

    //inactive the current active interact and active the request interact.
    self.activeInteract = function(interact) {
        if (_activeInteract == interact) {
            //interact already enabled
            return;
        } else if (_activeInteract != null && _activeInteract != interact) {
            if (self.interacts[_activeInteract] instanceof ol.interaction.Select) {
                self.interacts[_activeInteract].getFeatures().clear();
            }
            self.interacts[_activeInteract].setActive(false);
            self.on(_activeInteract + "_inactive");
        }
        _activeInteract = interact;
        if (interact != null) {
            self.interacts[interact].setActive(true);
            self.on(interact + "_active");
        }
    }

    var _tileLayers = {};

    self.getTileLayer = function(layer_name) {
        return _tileLayers[layer_name];
    }

    //default mudmap state 
    self.default_state = {
        layers : null,
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
    self.mapKey = null;
    //the map key prefix, all named maps sharing the same map key prefix are belonging to the same user and same map application.
    self.mapKey_prefix = null;
    //return the map key with the map name
    self.getMapKey = function(name) {
        if (self.mapKey_prefix == null) {
            if (self.application == null) {
                self.mapKey_prefix = "mudmap_" + self.user.email.toLowerCase() + "_";
            } else {
                self.mapKey_prefix = "mudmap" + self.application + "_" + self.user.email.toLowerCase() + "_";
            }
        }
        return self.mapKey_prefix + name;
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
            if (typeof e == "object" && typeof e.call == "function") {
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
            if (typeof e == "string") {
                if (!(e in _events)) {
                    _events[e] = [];
                }
                _events[e].push(func);
            } else {
                $.each(e,function(index,e1){
                    if (!(e1 in _events)) {
                        _events[e1] = [];
                    }
                    _events[e1].push(func);
                });

            }
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

    self.getLayer = function(name) {
        var layer = null;
        $.each(self.layers,function(index,l){
            if (l.name == name) {
                layer = l;
                return false;
            }
        });
        return layer;
    }

    self.on("add_layer",function(e) {
        self.state.layers = self.state.layers || [];
        e.layer.selected = true;
        //self.state.layers.push(e.layer);
        self.state.layers.splice(0,0,e.layer);

        if (self.state.layers[0].name == e.layer.name) {
            //this is the first added layer. remove the default layer
            var tile_layer = _tileLayers[self.defaultLayer.name];
            if (tile_layer) {
                self.map.removeLayer(tile_layer);
                delete _tileLayers[self.defaultLayer.name];
            }
        }

        var tile_layer = self.create_tile_layer(e.layer);
        _tileLayers[e.layer.name]= tile_layer;
        self.map.addLayer(tile_layer);
    });

    self.on("remove_layer",function(e) {
        var tile_layer = _tileLayers[e.layer.name];
        if (tile_layer) {
            self.map.removeLayer(tile_layer);
            delete _tileLayers[e.layer.name];
        }

        self.state.layers = self.state.layers || [];
        $.each(self.state.layers,function(index,l){
            if (l.name == e.layer.name) {
                self.state.layers.splice(index,1);
                return false;
            }
        });
        e.layer.selected = false;

        if (self.state.layers && self.state.layers.length == 0) {
            //add default layer
            var tile_layer = self.create_tile_layer(self.defaultLayer);
            _tileLayers[self.defaultLayer.name] = tile_layer;
            self.map.addLayer(tile_layer);
        }
    });

    //upload a file
    //the file can be json file or zip file, this method just trigger a event, the listener will implement the acutal upload logic.
    self.upload = function(file) {
        self.on({"name":"upload","file":file});
    }

    var _changestate_processing = false;
    // called when map is changed.
    //this method will trigger events "change_state","state_changed" and "post_state_changed" in order
    var _changestate = function() {
        if (_changestate_processing) {
            return;
        }
        _changestate_processing = true;
        setTimeout(function() {
            self.state.zoom = self.map.getView().getZoom();
            self.state.resolution = self.map.getView().getResolution();
            self.state.center = self.map.getView().getCenter();
            self.on(["change_state","state_changed","post_state_changed"]);
        }, 100);
    };

    self.on("post_state_changed",function() {
        _changestate_processing = false;
    })

    self.on("init_state",function(){
        if (self.state == null) {
            self.state =  _.defaults({},self.default_state);
        }
        var found = false;
        if (self.state.layers) {
            $.each(self.state.layers,function(index,activelayer){
                found = false;
                $.each(self.layers,function(index2,layer){
                    if (activelayer.name == layer.name) {
                        found = true;
                        _.defaults(layer,activelayer);
                        self.state.layers[index] = layer;
                        return false;
                    }
                });
                if (!found) {
                    self.on({"name":"layer_not_exist","layer":layer});
                }
            });

            //remove the default layers from active layers
            $.each(self.state.layers,function(index,layer) {
                if (layer.name == self.defaultLayer.name) {
                    self.state.layers.splice(index,1);
                    return false;
                }
            });
        }
    });
        
    self.on("create_map",function() {
        $.each( (self.state.layers && self.state.layers.length > 0)?self.state.layers : [self.defaultLayer],function(index,layer){
            var tile_layer = self.create_tile_layer(layer);
            tile_layer.set("_layer_name",layer.name,true);
            _tileLayers[layer.name] = tile_layer;
        });
        self.map = new ol.Map({
            logo: false,
            layers: _.map(_tileLayers,function(layer,name){return layer;}),
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
    });

    //listen to post_init event
    //register a map listener to listen to "postrender" event
    self.on("post_init",function() {
        self.map.on("postrender", _changestate);
    });

    self.on("change_opacity",function(e){   
        e.layer.opacity = e.opacity;
        var tile_layer = _tileLayers[e.layer.name];
        if (tile_layer) {
            tile_layer.setOpacity(e.opacity / 100);
        }
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
            self.mapKey = self.getMapKey(self.mapName);

            self.on(["init_app","init_name","load_layers","load_state","init_state","set_state","create_map","init_map","init_view","post_init_view","post_init"]);
        });

    }
    self.on("post_init_view",function() {
        $(document).foundation();
    });


}();


$(document).ready(function() {
    //$(document).foundation();
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
