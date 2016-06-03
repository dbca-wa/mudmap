(function(mudmap) {
    var self = mudmap;

    var _layerListTable = null;
    var _activeLayerListTable = null;
    var _layerTemplate = null;
    var _activeLayerTemplate = null;
    var _attributeLayerTemplate = null;

    //listen to change_label feature
    // popup a dialog to input the label
    self.on("change_label",function(e){
        var feature = e.feature;
        $("#lblform").toggle(true);
        $("input#label").off().val(feature.get("label") || self.currentStyles.label);
        $("input#label").on("keyup", function() { 
            self.delay(function() {
                feature.set("label", $("input#label").val());
                feature.style = null;
            }, 500);
        });
    });

    //listen to interact_lbl_inactive event
    //hiden the label change dialog
    self.on("lbl_inactive",function() {
        $("#lblform").toggle(false);
    });

    //listen to interact_lbl_inactive event
    //reset measure html to empty
    self.on("pan_inactive",function() {
        $("#measure").html("");
    });


    //listen to state_changed event
    self.on("state_changed",function() {
        if (self.state.features.featureSize) {
            $("#numfeatures").text(" (" + self.state.features.featureSize + ")");
        }
        if (self.state.history) {
            $("#undos").text(" (" + self.state.history.length + ")");
        }
        if (self.state.redo) {
            $("#redos").text(" (" + self.state.redo.length + ")");
        }

        var fixed_scale = self.get_fixed_scale();
        $('#scaletext').text(numeral(fixed_scale).format('0,0'));
    });

    self.on("pre_print",function() {
        $("#export-pdf").prop("disabled", true);
        document.body.style.cursor = "progress";
    });

    self.on("post_print",function() {
        $("#export-pdf").prop("disabled", false);
        document.body.style.cursor = "auto";
    });

    self.on("feature_measured",function(e){
        if (e["type"] == null) {
            $("#measure").html("");
        } else if(e["type"] == "Polygon") {
            $("#measure").html(e["area"] + " perim " + e["length"]);
        } else if(e["type"] == "LineString") {
            $("#measure").html(e["length"]);
        } else {
            $("#measure").html("");
        }
    });

    //attach the listener to buttons
    self.on("init_view",function(){
        $("#mapid").text(self.mapName);
        $.each(self.saved_maps, function(index, name) {
            var id = "saved_map_" + name;
            $("#maplist ul").append(
                '<li id="' + id + '"><div class="row"><div class="columns"><a href="./?' + 
                $.param({name:name}) + '">' + name + '</a></div><div class="columns shrink"><button id="' + 
                name + '" class="button hollow alert removemap">Remove<button></div></li>'
            );
        })
        $("button.removemap").on("click", function() {
            var name = $(this).attr("id");
            if (confirm("Are you sure you want to remove " + name + "?")) {
                self.delete_saved_map(name);
                $("#saved_map_" + name).remove();

            }
        })


        $("div.controls .toggle").on("click", function() {
            $("div.controls .toggle").addClass("hollow");
            $(this).removeClass("hollow");
            self.activeInteract($(this).attr("id"))
        });
        $("#rotation").on("moved.zf.slider", function() {
            var rotation = parseInt($(this).find("input").val());
            self.map.getView().setRotation(rotation);
            //map.rotateFeature.set("rotation", rotation);
            //map.rotateFeature.style = null;
        });

        $("#zoom").on("click", self.fitFeatures);
        $("#undo").on("click", self.undo);
        $("#redo").on("click", self.redo);
        $("#pan").click();


        $("#colour button").on("click", function() {
            self.currentStyles.colour = $(this).css("background-color");
            $("#colourbutton").css({
                "background-color": self.currentStyles.colour
            }).click();
            $("#col").click();
        });
        self.currentStyles.colour = $("#colourbutton").css("background-color");


        $("#sizelist button").on("click", function() {
            self.currentStyles.size = $(this).css("font-size").slice(0,-2) / $("body").css("font-size").slice(0,-2)
            $("#siz").click();
        });

        $("#lblform button").on("click",function(){
            $("#lblform").toggle(false);
        });

        $.each(self.fixed_scales,function(index,scale) {
            $("#fixedscale_" + scale).on("click",function(){
                self.set_scale(scale);
                $("#fixedscale").click();
            });

        });

        $("#export-json").on("click", self.exportGeojson);

        $("#export-pdf").on("click", self.print);

        $("#upload").on("change", function(){
            var file = $(this).prop("files")[0];
            self.upload(file);
        });

        $("#download").on("click", self.download);

        $("#app_name").text(self.application);
        document.title = self.application;

    });

    var _switchLayer = function() {
        var layer = self.getLayer($(this).attr("layer"));
        if ($(this).attr("src") == "switch-off.png") {
            self.on([
                {"name":"pre_add_layer","layer":layer},
                {"name":"add_layer","layer":layer},
                {"name":"post_add_layer","layer":layer}
            ]);
        } else {
            self.on([
                {"name":"remove_layer","layer":layer},
                {"name":"post_remove_layer","layer":layer}
            ]);
        }
    }

    var _removeLayer = function() {
        var layer = self.getLayer($(this).attr("layer"));
        self.on([
            {"name":"remove_layer","layer":layer},
            {"name":"post_remove_layer","layer":layer}
        ]);
    }

    //update layerlist table after layer is added or removed
    self.on(["post_remove_layer","post_add_layer"],function(e){
        _layerListTable.rows().every(function(rowIdx,tableLoop,rowLoop){
            if (this.data().name == e.layer.name) {
                this.cell(rowIdx,0).invalidate();
            }
        });
    });

    //destroy slider, remove from attributelayerlist, and update activelayerlist table after layer is removed.
    self.on("post_remove_layer",function(e){
        $("#slider_" + e.layer.id).foundation("destroy");
        _activeLayerListTable.row(function(rowIdx,data,node){
            return data.name == e.layer.name;
        }).remove().draw();

        self.debug("remove layer " + e.layer.title + " active layers[ " +  _.map(self.state.layers,function(layer){return layer.zindex + " = " + layer.title}) + "]");
    });

    self.on(["post_remove_layer","attribute_not_available"],function(e){
        $("#attributelayer_" + e.layer.id).remove();
    });

    //update activelayerlist table, add layer to attributelayerlist.
    self.on("post_add_layer",function(e){
        $("#tab_activelayers").trigger("click");
        _activeLayerListTable.row.add(e.layer).draw();
        new Foundation.Slider($("#slider_" + e.layer.id),{"initialStart":e.layer.opacity});
        $("#tab_layers").trigger("click");
        var before_layer = null;
        $.each(self.layers,function(index,layer) {
            if (!layer.selected) {
                return;
            }
            if (layer.name == e.layer.name) {
                if (before_layer) {
                    $(_attributeLayerTemplate(layer)).insertAfter($("#attributelayer_" + before_layer.id));
                    return false;
                } else {
                    $("#attributelayerlist").prepend( _attributeLayerTemplate(layer));
                    return false;
                }
            } else {
                before_layer = layer;
            }

        });
        self.debug("add layer " + e.layer.title + ", active layers [" + _.map(self.state.layers,function(layer){return layer.zindex + " = " + layer.title}) + "]");
    });

    var _changeOpacity = function() {
        var layer = self.getLayer($(this).attr("layer"));
        var opacity = $("#opacity_" + layer.id).val();
        self.on({"name":"change_opacity","layer":layer,"opacity":opacity});
    }


    self.on("post_move_layer",function(e) {
        _activeLayerListTable.cells(null,1).invalidate();
        self.debug("move layer " + e.layer.title  + ": from " + e.oldPosition + " to " + e.newPosition + " (" + e.moveDistance + ")");
        self.debug("active layers [" + _.map(self.state.layers,function(layer){return layer.zindex + " = " + layer.title}) + "]");
    });


    //initialize the layerlist table and activelayerlist table
    self.on("post_init",function(e,listener_chain) {
        _layerTemplate = Handlebars.compile($("#layer_template").html());
        _activeLayerTemplate = Handlebars.compile($("#activelayer_template").html());
        //init table for layers
        $("#tab_layers").trigger("click");
        _layerListTable = $("#layerlist").DataTable({
            dom:"ft",
            data: self.layers,
            scrollY:"750px",
            scrollCollapse:true,
            bPaginate:false,
            bAutoWidth:false,
            bProcessing:false,
            bServerSide:false,
            ordering:false,
            bInfo:false,
            columnDefs:[
                {
                    targets:0,
                    orderable:false,
                    data:"title",
                    searchable:false,
                    render: function(data,type,full) {
                        return _layerTemplate(full);
                    }
                },
                {
                    targets:1,
                    orderable:false,
                    data:"title",
                    searchable:true,
                    visible:false
                },
            ],
        });
        //remove search label from filter widget.
        $("#layerlist_filter label").replaceWith($("#layerlist_filter label input"));
        //attach event to select columns
        $("#layersetting_section").on('click',"table#layerlist td .switch",_switchLayer);

        //init table for active layers
        $("#tab_activelayers").trigger("click");
        _activeLayerListTable = $("#activelayerlist")
        .on("init.dt",function(){
            if (self.state.layers) {
                $.each(self.state.layers,function(index,layer){ 
                    new Foundation.Slider($("#slider_" + layer.id),{"initialStart":layer.opacity});
                });
            }
        })
        .DataTable({
            dom:"t",
            data: self.state.layers,
            scrollY:"750px",
            scrollCollapse:true,
            bPaginate:false,
            bAutoWidth:false,
            bProcessing:false,
            bServerSide:false,
            ordering:true,
            bInfo:false,
            order:[[1,'desc']],
            rowReorder: {
                selector:'tr .layer_title',
                update:false,
            },
            columnDefs:[
                {
                    targets:0,
                    orderable:false,
                    data:"name",
                    render: function(data,type,full) {
                        return _activeLayerTemplate(full);
                    }
                },
                {
                    targets:1,
                    orderable:false,
                    data:"zindex",
                    visible:false
                }
            ],
        });

        _activeLayerListTable.on("row-reorder",function(e,details,changes){
            if (details == null || details.length == 0) {
                //no row is moved
                return;
            }
            var detail = null;
            if (details.length == 2) { 
                detail = details[0];
            } else if (details[0].oldPosition - details[0].newPosition + 1 == details.length) {
                //move up
                detail = details[0];
            } else {
                //move down
                detail = details[details.length - 1];
            }
            var layer = self.state.layers[detail.oldPosition];
            self.on([
                {"name":"pre_move_layer","layer":layer,"newPosition":detail.newPosition,"oldPosition":detail.oldPosition,"moveDistance" : details.length},
                {"name":"move_layer","layer":layer,"newPosition":detail.newPosition,"oldPosition":detail.oldPosition,"moveDistance" : details.length},
                {"name":"post_move_layer","layer":layer,"newPosition":detail.newPosition,"oldPosition":detail.oldPosition,"moveDistance" : details.length},
            ]);
        });

        self.activeLayerListTable = _activeLayerListTable;

        //attach event to select columns
        $("#layersetting_section").on('click',"table#activelayerlist td .remove",_removeLayer);


        $("#layersetting_section").on('moved.zf.slider',"table td .slider",_changeOpacity);

        if (!self.state.layers || self.state.layers.length == 0) {
            $("#tab_layers").trigger("click");
        }
        
    });

    //initialize the attribute layer list
    self.on("init_view",function(e,listener_chain) {
        _attributeLayerTemplate = Handlebars.compile($("#attributelayer_template").html());
        $.each(self.layers,function(index,layer) {
            if (!layer.selected) {
                return;
            //} else if(!layer.wfs_url) {
            //    return;
            }
            var layerButton = $(_attributeLayerTemplate(layer));
            layerButton.prop("disabled",true);
            $("#attributelayerlist").append(layerButton);
            
        });

        $("#attributelayerlist").on("click","button", function() {
            $("#attributelayerlist button").prop("disabled",true);
            var layer = self.getLayer($(this).attr("layer"));
            self.on([
                {"name":"choose_attributelayer","layer":layer},
                "state_changed",
                {"name":"attributelayer_choosed","layer":layer},
                "post_choose_attributelayer"
            ]);
            $("#attribute").click();
        });

        if(self.state.attributelayer) {
            var layer = self.state.attributelayer;
            self.state.attributelayer = null;
            self.on([
                {"name":"choose_attributelayer","layer":layer},
                {"name":"attributelayer_choosed","layer":layer},
                "post_choose_attributelayer"
            ]);
        } else {
            self.on("post_choose_attributelayer");
        }

    });

    self.on("attributelayer_choosed",function(e) {
        $("#attributelayer_" + e.layer.id + " i").addClass("fi-check");
    });
    self.on("attributelayer_unchoosed",function(e) {
        $("#attributelayer_" + e.layer.id + " i").removeClass("fi-check");
    });
    self.on("post_choose_attributelayer",function(e) {
        $("#attributelayerlist button").prop("disabled",false);
    });
    self.on("attribute_inactive",function() {
        $("#attributelayerlist").toggle(false);
    });

    self.on("attribute_active",function() {
        $("#attributelayerlist").toggle(true);
    });

})(mudmap);
