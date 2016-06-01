(function(mudmap) {
    var self = mudmap;

    // Convenience loader to create a WMTS layer from a kmi datasource
    self.on("init_app",function() {
        self.application = null;
        if ($.urlParam("app")) {
            self.application = $.urlParam("app");
        } else {
            self.application = null;
        }
    });

    //listen to "init_name" to process map name.
    self.on("init_name",function(e) {
        self.mapName = null;
        // Detect if url to existing mudmap, if not get/create one
        if (!$.urlParam("name")) {
            //name not in url, ask user to input one.
            self.mapName = window.prompt("Load existing or create mudmap - enter name:");
            if (!self.mapName) { 
                //user input a empty name, reload to require user to input again
                window.location.reload() 
            }
            self.mapKey = self.getMapKey($.param({name: self.mapName}).slice(5));
            // add map name to url and refresh page to reload.
            window.location.search = "?" + $.param({
                name: self.mapName
            });
            return false;
        } else {
            //name included in url
            self.mapName = $.urlParam("name");
            self.mapKey = self.getMapKey(self.mapName);
        }
    });

})(mudmap);
