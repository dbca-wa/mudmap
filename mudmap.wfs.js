
(function(mudmap) {
    var self = mudmap;

    var _get_feature = function(coordinate) {
        console.log(coordinate);
    }

    var FeatureDetail = function() {
        var self = this;
        self.mudmap = mudmap;

        var _listener = null;
        
        self.setActive = function(active) {
            if (active) {
                if (!_listener) {
                    _listener = self.mudmap.map.on("singleclick", function(e){
                        _get_feature(e.coordinate);
                    });
                }
            } else if(_listener){
                _listener = self.mudmap.map.un("singleclick", _listener);
            }
        }
    }

    self.on("remove_layer",function(e) {
        if (e.layer.wfs_url) {
            e.layer.query = false;
        }
    });

    self.on("choose_vectorlayer",function(e) {
        if (self.state.vectorlayer) {
            self.state.vectorlayer.query = false;
            var vectorlayer = self.state.vectorlayer;
            self.state.vectorlayer = null;
            self.on({"name":"vectorlayer_unchoosed","layer":vectorlayer});
        }
        e.layer.query = true;
        self.state.vectorlayer = e.layer;
        self.on({"name":"vectorlayer_choosed","layer":e.layer});

    });

    self.on("init_map",function() {
        self.interacts.feature = new FeatureDetail();
    });

})(mudmap);
