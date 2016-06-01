(function(mudmap) {
    var self = mudmap;

    //current draw style
    self.currentStyles = {
        label: "",
        rotation: 0,
        textonly: false,
        size: 1
    };

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
            //saveAs(jsonblob, "p&w_mudmap_" + self.mapName + ".json");
            saveAs(jsonblob, self.mapKey + ".json");
        } else {
            saveAs(jsonblob, self.mapKey + "_" + self.state.lastsave + ".json");
        }
    }

    //fit features in the view.
    self.fitFeatures =  function() {
        if (_features.getLength() > 0) {
            self.map.getView().fit(_featureOverlay.getSource().getExtent(), self.map.getSize());
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

    //listen to change_state event.
    //change the map state based on features
    //if under undo_redo_mode, map state is already processed by undo or redo functions, so just do nothing.
    self.on("change_state",function() {
        if (_undoRedoMode) {
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
    
    //listen to post_state_changed.
    //set undo_redo_mode to false
    self.on("post_state_changed",function() {
        _undoRedoMode = false;
    });

    var _undoRedoMode = false;
    //undo an action
    self.undo = function() {
        if (_undoRedoMode) {
            return ;
        }
        if (self.state.history && self.state.history.length > 0) {
            _undoRedoMode = true;
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
        if (_undoRedoMode) {
            return ;
        }
        if (self.state.redo && self.state.redo.length > 0) {
            _undoRedoMode = true;
            self.state.history = self.state.history || [];
            self.state.history.push(self.state.features);
            self.state.features = self.state.redo.pop();
            _features.clear();
            _features.extend(self.geojson.readFeatures(self.state.features));
            self.state.featureSize = _features == null?0:_features.getArray().length;
        }
    }

    //listen to init_interact
    self.on("init_map",function() {
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
            self.interacts[key] = new ol.interaction.Draw({
                features: _features,
                type: value
            });
            self.interacts[key].on("drawend", function(e) {
                self.on({"name":"change_label","feature":e.feature});
            });
            self.map.addInteraction(self.interacts[key]);
        });

        //modify feature
        self.interacts.mod = new ol.interaction.Modify({
            features: _features
        });
        self.map.addInteraction(self.interacts.mod);

        //delete feature
        self.interacts.del = new ol.interaction.Select();
        self.map.addInteraction(self.interacts.del);
        self.interacts.del.on("select", function(e) {
            _features.remove(e.selected[0]);
            self.interacts.del.getFeatures().remove(e.selected[0]);
        });

        // In pan mode display area/length of clicked feature
        self.interacts.pan = new ol.interaction.Select();
        self.map.addInteraction(self.interacts.pan);
        self.interacts.pan.on("select", function(e) {
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
        self.interacts.lbl = new ol.interaction.Select();
        self.map.addInteraction(self.interacts.lbl);
        self.interacts.lbl.on("select", function(e) {
            if (!e.selected[0]) {
                return;
            }
            self.on({"name":"change_label","feature":e.selected[0]});
        })
        self.interacts.lbl.on("change:active", function(e) {
            self.interacts.lbl.getFeatures().clear();
        });

        self.interacts.col = new ol.interaction.Select();
        self.map.addInteraction(self.interacts.col);
        self.interacts.col.on("select", function(e) {
            if (!e.selected[0]) {
                if (!e.deselected[0] || e.deselected[0].get("colour") != self.currentStyles.colour) {
                    window.alert("Please click a feature to set its colour.");
                }
                return;
            }
            e.selected[0].set("colour", self.currentStyles.colour);
            e.selected[0].style = null;
        });

        self.interacts.siz = new ol.interaction.Select();
        self.map.addInteraction(self.interacts.siz);
        self.interacts.siz.on("select", function(e) {
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

        self.interacts.snap = new ol.interaction.Snap({
            source: _featureOverlay.getSource()
        });
        self.map.addInteraction(self.interacts.snap);

        $.each(self.interacts,function(interact,ctl){
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


