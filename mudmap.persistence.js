(function(mudmap) {
    var self = mudmap;

    self.map_name = null;
    self.persistent_key = null;
    var _persistent_key_prefix = null;

    // Save history into localforage
    self.on("statechanged",function() {
        self.state.lastsave = moment().format();
        localforage.setItem(self.persistent_key, self.state);
    });

    self.on("upload", function(e) {
        var reader = new FileReader();
        reader.onload = function(f) {
            window.mapzip = new JSZip(f.target.result);
            if (mapzip.files["mudmap.json"] && confirm("Replace current mudmap with " + e.file.name + " ?")) {
                localforage.setItem(self.persistent_key, JSON.parse(mapzip.files["mudmap.json"].asText())).then(function() {
                    // reload to init from uploaded file
                    window.location.reload();
                });
            } else {
                alert("This zipfile didn't contain mudmap.json =(");
            }
        };
        if (e.file.name.endsWith(".zip")) {
            reader.readAsArrayBuffer(e.file);
            return false;
        } else {
            return true;
        }
    });

    self.saved_maps = [];
    self.on("init_map", function(e,listener_chain) {
        localforage.keys(function(err, keys) {
            $.each(keys, function(index, fkey) {
                if (fkey.startsWith(_persistent_key_prefix) && fkey != self.persistent_key) {
                    var name = fkey.replace(_persistent_key_prefix, "");
                    self.saved_maps.push(name);
                }
            });
            listener_chain.call();
        });
        return false;
    });

    self.delete_saved_map = function(name) {
        var fkey = get_persistent_key(name);
        localforage.removeItem(fkey);
    }

    var get_persistent_key = function(name) {
        if (_persistent_key_prefix == null) {
            if (self.map_app == null) {
                _persistent_key_prefix = self.user.email.toLowerCase() + "_map_" ;
            } else {
                _persistent_key_prefix = self.map_app + "_" + self.user.email.toLowerCase() + "_map_";
            }
        }
        return _persistent_key_prefix + name;
    }

    self.on("init",function(e,listener_chain) {
        self.map_name = null;
        // Detect if url to existing mudmap, if not get/create one
        if (!$.urlParam("name")) {
            self.map_name = window.prompt("Load existing or create mudmap - enter name:");
            if (!self.map_name) { window.location.reload() }
            self.persistent_key = get_persistent_key($.param({name: self.map_name}).slice(5));
            // Default map
            window.location.search = "?" + $.param({
                name: self.map_name
            });
            return false;
        } else {
            self.map_name = $.urlParam("name");
            self.persistent_key = get_persistent_key(self.map_name);

            localforage.getItem(self.persistent_key).then(function(state) {
                if (state) {
                    self.state = _.defaults(state,self.default_state);
                    if (!self.state.layers) {
                        self.state.layers = [{
                            opacity: 1,
                            layer: "dpaw:mapbox_outdoors",
                            format: "image/jpeg"
                        }];
                    }
                } else {
                    self.state = _.defaults({},self.default_state);
                }
                listener_chain.call();
                
            });
            return false;
        }
    });

})(mudmap);
