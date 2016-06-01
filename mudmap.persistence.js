(function(mudmap) {
    var self = mudmap;

    self.mapName = null;

    // Save history into localforage
    self.on("state_changed",function() {
        self.state.lastsave = moment().format();
        localforage.setItem(self.mapKey, self.state);
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
        saveAs(content, self.mapKey + "_" + self.state.lastsave + ".zip");
        document.body.style.cursor = "auto";
    }

    //listen to upload event to upload a zip file.
    self.on("upload", function(e) {
        var reader = new FileReader();
        reader.onload = function(f) {
            window.mapzip = new JSZip(f.target.result);
            if (mapzip.files["mudmap.json"] && confirm("Replace current mudmap with " + e.file.name + " ?")) {
                localforage.setItem(self.mapKey, JSON.parse(mapzip.files["mudmap.json"].asText())).then(function() {
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
                if (fkey.startsWith(self.mapKey_prefix) && fkey != self.mapKey) {
                    var name = fkey.replace(self.mapKey_prefix, "");
                    self.saved_maps.push(name);
                }
            });
            listener_chain.call();
        });
        return false;
    });

    //delete a named map from persistence storage.
    self.delete_saved_map = function(name) {
        var fkey = self.getMapKey(name);
        localforage.removeItem(fkey);
    }

    //listen to "init_name" to process map name.
    self.on("load_state",function(e,listenerChain) {
        //try to get map state from persistence storage
        localforage.getItem(self.mapKey).then(function(state) {
            if (state) {
                //map state exists
                self.state = _.defaults(state,self.default_state);
            } else {
                //map state does not exist, use default state
                self.state = _.defaults({},self.default_state);
            }
            //call listener_chain manually
            listenerChain.call();
        });
        //already call listener_chain in the aysnc callback, ask caller to stop call listener_chain.
        return false;
    });

})(mudmap);
