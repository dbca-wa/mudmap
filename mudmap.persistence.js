(function(mudmap) {
    var self = mudmap;

    self.map_name = null;

    // Save history into localforage
    self.on("statechanged",function() {
        self.state.lastsave = moment().format();
        localforage.setItem(self.map_key, self.state);
    });

    // Download map states as zip file
    self.download = function() {
        document.body.style.cursor = "progress";
        var zip = new JSZip();
        zip.file("mudmap.json", JSON.stringify(self.state));
        var content = zip.generate({
            type: "blob",
            compression: "DEFLATE"
        });
        saveAs(content, self.map_key + "_" + self.state.lastsave + ".zip");
        document.body.style.cursor = "auto";
    }

    //listen to upload event to upload a zip file.
    self.on("upload", function(e) {
        var reader = new FileReader();
        reader.onload = function(f) {
            window.mapzip = new JSZip(f.target.result);
            if (mapzip.files["mudmap.json"] && confirm("Replace current mudmap with " + e.file.name + " ?")) {
                localforage.setItem(self.map_key, JSON.parse(mapzip.files["mudmap.json"].asText())).then(function() {
                    // reload to init from uploaded file
                    window.location.reload();
                });
            } else {
                alert("This zipfile didn't contain mudmap.json =(");
            }
        };
        if (e.file.name.endsWith(".zip")) {
            reader.readAsArrayBuffer(e.file);
            //file is uploaded ,no need other listeners to process
            return false;
        } else {
            //require other listeners to process
            return true;
        }
    });

    self.saved_maps = [];
    //listen to "init_map" to load saved maps
    self.on("init_map", function(e,listener_chain) {
        localforage.keys(function(err, keys) {
            $.each(keys, function(index, fkey) {
                if (fkey.startsWith(self.map_key_prefix) && fkey != self.map_key) {
                    var name = fkey.replace(self.map_key_prefix, "");
                    self.saved_maps.push(name);
                }
            });
            listener_chain.call();
        });
        return false;
    });

    //delete a named map from persistence storage.
    self.delete_saved_map = function(name) {
        var fkey = self.get_map_key(name);
        localforage.removeItem(fkey);
    }

    //listen to "init_name" to process map name.
    self.on("init_name",function(e,listener_chain) {
        self.map_name = null;
        // Detect if url to existing mudmap, if not get/create one
        if (!$.urlParam("name")) {
            //name not in url, ask user to input one.
            self.map_name = window.prompt("Load existing or create mudmap - enter name:");
            if (!self.map_name) { 
                //user input a empty name, reload to require user to input again
                window.location.reload() 
            }
            self.map_key = self.get_map_key($.param({name: self.map_name}).slice(5));
            // add map name to url and refresh page to reload.
            window.location.search = "?" + $.param({
                name: self.map_name
            });
            return false;
        } else {
            //name included in url
            self.map_name = $.urlParam("name");
            self.map_key = self.get_map_key(self.map_name);
            //try to get map state from persistence storage
            localforage.getItem(self.map_key).then(function(state) {
                if (state) {
                    //map state exists
                    self.state = _.defaults(state,self.default_state);
                } else {
                    //map state does not exist, use default state
                    self.state = _.defaults({},self.default_state);
                }
                //call listener_chain manually
                listener_chain.call();
                
            });
            //already call listener_chain in the aysnc callback, ask caller to stop call listener_chain.
            return false;
        }
    });

})(mudmap);
