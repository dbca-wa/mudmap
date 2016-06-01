
(function(mudmap) {
    var self = mudmap;

    var _featureOverlay = null;

    var _attributeTableModal = null;
    var _attributeTable = null;

    var _features = new ol.source.Vector({});

    var _featuresInfo = {};

    var _getFeature = function(coordinate) {
        if (self.state.attributelayer && _featuresInfo[self.state.attributelayer.name]){
            var url = self.state.attributelayer.wfs_url + "request=getFeature&outputFormat=application/json";
            if (["gml:MultiPolygon","gml:Polygon"].indexOf(_featuresInfo[self.state.attributelayer.name].geometry.type) >= 0) {
                url += "&CQL_FILTER=CONTAINS(wkb_geometry,POINT(" + coordinate[1] + " " + coordinate[0]  +"))";
            } else {
                window.alert("Geometry type (" + _featuresInfo[self.state.attributelayer.name].geometry.type + ") not support");
            }
            $.get(url,function(data){
                //remove all rows
                _attributeTable.clear();

                _features.clear();
                if (!data || !data.features || data.features.length == 0) {
                    _attributeTable.draw();
                    return;
                }
                _attributeTableModal.foundation('open');
                $.each(data.features,function(index,feature){
                    if ("gml:MultiPolygon" == _featuresInfo[self.state.attributelayer.name].geometry.type) {
                        _features.addFeature(new ol.Feature({
                            geometry: new ol.geom.MultiPolygon(feature.geometry.coordinates),
                            name:self.state.attributelayer.name
                        }));
                    }
                });

                _attributeTable.rows.add(_.map(data.features,function(feature){return feature.properties})).draw();

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
                        _getFeature(e.coordinate);
                    });
                }
            } else if(_listener){
                self.mudmap.map.un("singleclick", _listener);
            }
        }
    }

    var _initDatatable = function(layerName) {
        var table = $("<table style='width:95%' class='cell-border'><thead><tr/></thead></table>");
        $.each(_featuresInfo[layerName].attributes,function(key,attribute){
            table.find("thead tr").append($("<th>" + attribute.data + "</th>"));
        });
        _attributeTableModal.find("#attribute_table_data").append(table);
    
        _attributeTable = table.DataTable({
            dom:"t",
            scrollY:"400px",
            scrollX:true,
            scrollCollapse:true,
            bPaginate:false,
            bAutoWidth:true,
            bProcessing:false,
            bServerSide:false,
            ordering:false,
            bInfo:false,
            columnDefs:_featuresInfo[layerName].attributes,
        });
    }

    self.on("choose_attributelayer",function(e,listenerChain) {
        if (self.state.attributelayer == e.layer) {
            //already chosed
            return;
        }

        //clear the previous choosed attribute layer
        if (self.state.attributelayer) {
            var attributelayer = self.state.attributelayer;
            self.state.attributelayer = null;
            self.on({"name":"attributelayer_unchoosed","layer":attributelayer});
        }
        //clear the attribute data table
        if (_attributeTable) {
            _attributeTable.destroy();
            _attributeTable = null;
            _attributeColumns = null;
            _features.clear();
            _attributeTableModal.find("#attribute_table_data").html("");
            _attributeTableModal.foundation('close');
        }
        //query feature info
        if (e.layer.name in _featuresInfo) {
            _initDatatable(e.layer.name);

            self.state.attributelayer = e.layer;
        } else {
            var url = e.layer.wfs_url + "request=DescribeFeatureType&outputFormat=application/json";
            $.get(url,function(data) {
                //initialize the dataTable
                if (!data.featureTypes || data.featureTypes.length == 0) {
                    window.alert("Feature type(" + e.layer.name + ") not found.");
                    return false;
                }

                var attributeColumns = [];
                var geometryColumn = {};

                var columnIndex = 0;
                $.each(data.featureTypes[0].properties,function(index,property) {
                    if (property.type.startsWith("gml:")) {
                        geometryColumn = {name:property.name,type:property.type};
                    } else {
                        attributeColumns.push({targets:columnIndex,orderable:false,data:property.name});
                        columnIndex += 1;
                    }
                });
                _featuresInfo[e.layer.name] = {geometry:geometryColumn,attributes:attributeColumns};

                _initDatatable(e.layer.name);

                self.state.attributelayer = e.layer;
                listenerChain.call();
                return false;
            });
        }
    });

    self.on("init_map",function() {
        self.interacts.attribute = new FeatureDetail();

        _featureOverlay = new ol.layer.Vector({
            source:  _features
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
