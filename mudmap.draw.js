(function(mudmap) {
    var self = mudmap;

    //current draw style
    self.currentStyles = {
        label: "",
        rotation: 0,
        textonly: false,
        size: 1
    };

    //inlude all supported interacts
    self.draw = {};

    //currently drawed features
    var _features = new ol.Collection();
    //the overlay to contain all features.
    var _featureOverlay = null;

    //export feature to a geojson file
    self.exportGeojson = function() {
        var jsonblob = new Blob([self.geojson.writeFeatures(_features.getArray())], {
            type: "application/vnd.geo+json;charset=utf-8"
        });
        if (!('lastsave' in self.state) || self.state.lastsave == null) {
            //saveAs(jsonblob, "p&w_mudmap_" + self.map_name + ".json");
            saveAs(jsonblob, self.map_key + ".json");
        } else {
            saveAs(jsonblob, self.map_key + "_" + self.state.lastsave + ".json");
        }
    }

    //fit features in the view.
    self.fitFeatures =  function() {
        if (_features.getLength() > 0) {
            self.map.getView().fit(_featureOverlay.getSource().getExtent(), self.map.getSize());
        }
    }

    //current active interact. 
    //only one interact is active at any time.
    var _active_interact = null;

    //set all interacts inactive.
    self.deinteract = function() {
        self.activeInteract(null);
    }

    //inactive the current active interact and active the request interact.
    self.activeInteract = function(interact) {
        if (_active_interact == interact) {
            //interact already enabled
            return;
        } else if (_active_interact != null && _active_interact != interact) {
            if (self.draw[_active_interact] instanceof ol.interaction.Select) {
                self.draw[_active_interact].getFeatures().clear();
            }
            self.draw[_active_interact].setActive(false);
            self.on("interact_" + _active_interact + "_inactive");
        }
        _active_interact = interact;
        if (interact != null) {
            self.draw[interact].setActive(true);
            self.on("interact_" + interact + "_active");
        }
    }

    //listen to upload event
    self.on("upload", function(e) {
        var reader = new FileReader();
        reader.onload = function(f) {
            if (confirm("Add features from " + e.file.name + " to mudmap?")) {
                window.filename = f;
                _features.extend(self.geojson.readFeatures(f.target.result));
                self.fitFeatures();
            }
        };
        if (e.file.name.endsWith(".json")) {
            reader.readAsText(e.file);
            //file is uploaded, no need other listeners to process.
            return false;
        } else {
            //require other listener to process the file.
            return true;
        }
    });

    //listen to changestate event.
    //change the map state based on features
    //if under undo_redo_mode, map state is already processed by undo or redo functions, so just do nothing.
    self.on("changestate",function() {
        if (_undo_redo_mode) {
            return;
        }
        var currentfeatures = _features == null?null:self.geojson.writeFeatures(_features.getArray());

        self.state.featureSize = _features == null?0:_features.getArray().length;
    
        if (self.state.features == null) {
            self.state.features = currentfeatures;
        } else if (currentfeatures != self.state.features) {
            self.state.history = self.state.history || [];
            // max 100 history
            self.state.history = self.state.history.slice(-100);
            self.state.history.push(self.state.features);
            self.state.features = currentfeatures;
        }
    });
    
    //listen to post_statechanged.
    //set undo_redo_mode to false
    self.on("post_statechanged",function() {
        _undo_redo_mode = false;
    });

    var _undo_redo_mode = false;
    //undo an action
    self.undo = function() {
        if (_undo_redo_mode) {
            return ;
        }
        if (self.state.history && self.state.history.length > 0) {
            _undo_redo_mode = true;
            self.state.redo = self.state.redo || [];
            self.state.redo.push(self.state.features);
            self.state.features = self.state.history.pop();
            _features.clear();
            _features.extend(self.geojson.readFeatures(self.state.features));
            self.state.featureSize = _features == null?0:_features.getArray().length;
        }
    }
    //redo an action
    self.redo = function() {
        if (_undo_redo_mode) {
            return ;
        }
        if (self.state.redo && self.state.redo.length > 0) {
            _undo_redo_mode = true;
            self.state.history = self.state.history || [];
            self.state.history.push(self.state.features);
            self.state.features = self.state.redo.pop();
            _features.clear();
            _features.extend(self.geojson.readFeatures(self.state.features));
            self.state.featureSize = _features == null?0:_features.getArray().length;
        }
    }

    //listen to init_draw
    self.on("init_draw",function() {
        // overlay which all interactions use
        _featureOverlay = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: _features
            }),
            style: function(feature) {
                if (feature.style) { return feature.style }
                $.each(self.currentStyles, function(key, value) {
                    if (!feature.get(key)) { feature.set(key, value) }
                });
                var fontsize = 16 * feature.get("size");
                if (feature.get("textonly")) {
                    feature.style = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: "rgba(255, 255, 255, 0.2)"
                        }),
                        stroke: new ol.style.Stroke({
                            color: feature.get("colour"),
                            width: 2 * feature.get("size")
                        }),
                        text: new ol.style.Text({
                            font: fontsize + "px Calibri,sans-serif",
                            rotation: parseInt(feature.get("rotation")) * Math.PI / 180,
                            fill: new ol.style.Fill({
                                color: feature.get("colour")
                            }),
                            stroke: new ol.style.Stroke({
                                color: "rgba(255, 255, 255, 0.7)",
                                width: 4
                            })
                        })
                    });
                } else {
                    feature.style = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: "rgba(255, 255, 255, 0.2)"
                        }),
                        stroke: new ol.style.Stroke({
                            color: feature.get("colour"),
                            width: 2 * feature.get("size")
                        }),
                        text: new ol.style.Text({
                            font: fontsize + "px Calibri,sans-serif",
                            textAlign: "left",
                            rotation: parseInt(feature.get("rotation")) * Math.PI / 180,
                            offsetX: fontsize / 2,
                            fill: new ol.style.Fill({
                                color: feature.get("colour")
                            }),
                            stroke: new ol.style.Stroke({
                                color: "rgba(255, 255, 255, 0.7)",
                                width: 4
                            })
                        }),
                        image: new ol.style.Circle({
                            radius: 4 * feature.get("size"),
                            fill: new ol.style.Fill({
                                color: feature.get("colour")
                            }),
                            stroke: new ol.style.Stroke({
                                color: "rgba(255, 255, 255, 0.7)",
                                width: 2
                            })
                        })
                    });
                }
                feature.style.getText().setText(feature.get("label"));
                return feature.style;
            }
        });
        _featureOverlay.setMap(self.map);

        //draw feature
        $.each({
            pnt: "Point",
            lns: "LineString",
            pol: "Polygon"
        }, function(key, value) {
            self.draw[key] = new ol.interaction.Draw({
                features: _features,
                type: value
            });
            self.draw[key].on("drawend", function(e) {
                self.on({"name":"change_label","feature":e.feature});
            });
            self.map.addInteraction(self.draw[key]);
        });

        //modify feature
        self.draw.mod = new ol.interaction.Modify({
            features: _features
        });
        self.map.addInteraction(self.draw.mod);

        //delete feature
        self.draw.del = new ol.interaction.Select();
        self.map.addInteraction(self.draw.del);
        self.draw.del.on("select", function(e) {
            _features.remove(e.selected[0]);
            self.draw.del.getFeatures().remove(e.selected[0]);
        });

        // In pan mode display area/length of clicked feature
        self.draw.pan = new ol.interaction.Select();
        self.map.addInteraction(self.draw.pan);
        self.draw.pan.on("select", function(e) {
            var new_event = {"name":"feature_measured"};
            if (e.selected[0]) {
                geom = e.selected[0].getGeometry();
                new_event["type"] = geom.getType();
                if (geom.getType() == "Polygon") {
                    new_event["length"] = self.featureLength(geom);
                    new_event["area"] = self.featureArea(geom);
                } else if (geom.getType() == "LineString") {
                    new_event["length"] = self.featureLength(geom);
                }
            } else {
                new_event["type"] = null;
            }
            self.on(new_event);
        });

        // Label and colour tools just set properties and let style function 
        // handle redraws
        self.draw.lbl = new ol.interaction.Select();
        self.map.addInteraction(self.draw.lbl);
        self.draw.lbl.on("select", function(e) {
            if (!e.selected[0]) {
                return;
            }
            self.on({"name":"change_label","feature":e.selected[0]});
        })
        self.draw.lbl.on("change:active", function(e) {
            self.draw.lbl.getFeatures().clear();
        });

        self.draw.col = new ol.interaction.Select();
        self.map.addInteraction(self.draw.col);
        self.draw.col.on("select", function(e) {
            if (!e.selected[0]) {
                if (!e.deselected[0] || e.deselected[0].get("colour") != self.currentStyles.colour) {
                    window.alert("Please click a feature to set its colour.");
                }
                return;
            }
            e.selected[0].set("colour", self.currentStyles.colour);
            e.selected[0].style = null;
        });

        self.draw.siz = new ol.interaction.Select();
        self.map.addInteraction(self.draw.siz);
        self.draw.siz.on("select", function(e) {
            if (!e.selected[0]) {
                if (!e.deselected[0] || e.deselected[0].get("size") != self.currentStyles.size) {
                    window.alert("Please click a feature to set its colour.");
                }
                window.alert("Please click a feature to set its size.");
                return;
            }
            e.selected[0].set("size", self.currentStyles.size);
            e.selected[0].style = null;
        });

        self.draw.snap = new ol.interaction.Snap({
            source: _featureOverlay.getSource()
        });
        self.map.addInteraction(self.draw.snap);

        $.each(self.draw,function(interact,ctl){
            ctl.setActive(false);
        });

        if (self.state.features) {
            self.map.once("postrender", function() {
                _features.extend(self.geojson.readFeatures(self.state.features));
                self.fitFeatures();
            });
        }
    });

})(mudmap);


