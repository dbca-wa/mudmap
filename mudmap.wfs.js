
(function(mudmap) {
    var self = mudmap;

    var _featureOverlay = null;

    var _attributeTableModal = null;
    var _attributeTable = null;
    var _attributeColumns = null;

    var _features = new ol.source.Vector({});

    var _get_feature = function(coordinate) {
        if (self.state.querylayer) {
            var url = self.state.querylayer.wfs_url + "request=getFeature&outputFormat=application/json&CQL_FILTER=CONTAINS(wkb_geometry,POINT(" + coordinate[1] + " " + coordinate[0]  +"))";
            $.get(url,function(data){
                if (_attributeTable) {
                    //remove all rows
                    _attributeTable.clear();
                }
                _features.clear();
                if (!data || !data.features || data.features.length == 0) {
                    return;
                }
                $.each(data.features,function(index,feature){
                    if (feature.geometry.type == "MultiPolygon") {
                        _features.addFeature(new ol.Feature({
                            geometry: new ol.geom.MultiPolygon(feature.geometry.coordinates),
                            name:self.state.querylayer.name
                        }));
                    }
                });

                //create the table and columns if not created before
                if (!_attributeTable) {
                    var table = $("<table style='width:95%'><thead><tr/></thead></table>");
                    _attributeColumns = [];
                    var index = 0;

                    $.each(data.features[0].properties,function(key,value){
                        _attributeColumns.push({targets:index,orderable:false,data:key});
                        index += 1;
                        table.find("thead tr").append($("<th>" + key + "</th>"));

                    });

                    _attributeTableModal.find("#attribute_table_data").append(table);
                    _attributeTable = 
                    _attributeTable = table.DataTable({
                        dom:"t",
                        data: _.map(data.features,function(feature){return feature.properties}),
                        scrollY:"400px",
                        scrollX:true,
                        scrollCollapse:true,
                        bPaginate:false,
                        bAutoWidth:true,
                        bProcessing:false,
                        bServerSide:false,
                        ordering:false,
                        bInfo:false,
                        columnDefs:_attributeColumns,
                    });
                } else {
                    _attributeTable.rows.add(_.map(data.features,function(feature){return feature.properties})).draw();
                }
                _attributeTableModal.foundation('open');

            });
        }
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
                self.mudmap.map.un("singleclick", _listener);
            }
        }
    }

    self.on("remove_layer",function(e) {
        if (e.layer.wfs_url) {
            e.layer.query = false;
        }
    });

    self.on("choose_querylayer",function(e) {
        if (self.state.querylayer == e.layer) {
            //already chosed
            return;
        }

        if (self.state.querylayer) {
            self.state.querylayer.query = false;
            var querylayer = self.state.querylayer;
            self.state.querylayer = null;
            self.on({"name":"querylayer_unchoosed","layer":querylayer});
        }

        if (_attributeTable) {
            _attributeTable.destroy();
            _attributeTable = null;
            _attributeColumns = null;
            _features.clear();
            _attributeTableModal.find("#attribute_table_data").html("");
            _attributeTableModal.foundation('close');
        }
        e.layer.query = true;
        self.state.querylayer = e.layer;
        self.on(["statechanged",{"name":"querylayer_choosed","layer":e.layer}]);

    });

    self.on("init_map",function() {
        self.interacts.feature = new FeatureDetail();

        _featureOverlay = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: _features
            }),
        });
        _featureOverlay.setMap(self.map);

    });

    
    self.on("post_init",function(){
        _attributeTableModal = $("<div id='attribute_table_modal' class='reveal large'><div id='attribute_table_data'/><button class='close-button' data-close aria-label='Close modal'  type='button'><i class='fi-x'></div>");
        //_attributeTableModal = $("<div id='attribute_table_modal' class='reveal large'></div>");
        $(document.body).append(_attributeTableModal);
        new Foundation.Reveal(_attributeTableModal,{"closeOnClick":false,"overlay":false});
        _attributeTableModal.foundation("close");
    });

})(mudmap);
