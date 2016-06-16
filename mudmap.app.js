(function(mudmap) {
    var self = mudmap;

    // Convenience loader to create a WMTS layer from a kmi datasource
    self.on("get_app_name",function() {
        self.application = window.location.pathname || "";
        if (self.application.startsWith("/")) {
            self.application = self.application.substring(1);
        }
        if (self.application.endsWith("/")) {
            self.application = self.application.substring(0,self.application.length - 1);
        }
        if (self.applicaiton == "") {
            //no application specified, redirect to default application sss.
            window.location.pathname = "/sss";
            return false;
        }
    });

    //listen to "get_map_name" to process map name.
    self.on("get_map_name",function(e) {
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
            var params = {
                name: self.mapName
            }
            window.location.search = "?" + $.param(params);
            return false;
        } else {
            //name included in url
            self.mapName = $.urlParam("name");
            self.mapKey = self.getMapKey(self.mapName);
        }
    });

})(mudmap);
