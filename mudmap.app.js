(function(mudmap) {
    var self = mudmap;

    // Convenience loader to create a WMTS layer from a kmi datasource
    self.on("init_app",function() {
        self.map_app = null;
        if ($.urlParam("app")) {
            self.map_app = $.urlParam("app");
        } else {
            self.map_app = null;
        }
    });
})(mudmap);
