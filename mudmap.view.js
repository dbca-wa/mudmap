(function(mudmap) {
    var self = mudmap;

    var _layers_table = null;
    var _activelayers_table = null;
    var _layer_template = null;
    var _activelayer_template = null;
    var _vectorlayer_template = null;

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
    self.on("interact_lbl_inactive",function() {
        $("#lblform").toggle(false);
    });

    //listen to interact_lbl_inactive event
    //reset measure html to empty
    self.on("interact_pan_inactive",function() {
        $("#measure").html("");
    });


    //listen to statechanged event
    self.on("statechanged",function() {
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
    self.on("init_map_view",function(){
        $("#mapid").text(self.map_name);
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
    });

    var _select_layer = function() {
        var addLayer = false;
        if ($(this).hasClass("fi-x")) {
            addLayer = true;
            //$(this).removeClass("fi-x").addClass("fi-check");
            self.on({"name":"add_layer","layer":self.getLayer($(this).attr("layer"))});
        } else {
            addLayer = false;
            //$(this).removeClass("fi-check").addClass("fi-x");
            self.on({"name":"remove_layer","layer":self.getLayer($(this).attr("layer"))});
        }
    }

    var _remove_layer = function() {
        self.on({"name":"remove_layer","layer":self.getLayer($(this).attr("layer"))});
    }

    self.on(["layer_removed","layer_added"],function(e){
        _layers_table.rows().every(function(rowIdx,tableLoop,rowLoop){
            if (this.data().name == e.layer.name) {
                this.cell(rowIdx,0).invalidate();
            }
        });
    });

    self.on("layer_removed",function(e){
        $("#slider_" + e.layer.id).foundation("destroy");
        _activelayers_table.row(function(rowIdx,data,node){
            return data.name == e.layer.name;
        }).remove().draw();

        if (e.layer.wfs_url) {
            $("#vectorlayer_" + e.layer.id).remove();
        }
    });

    self.on("layer_added",function(e){
        _activelayers_table.rows.add([e.layer]).draw();
        new Foundation.Slider($("#slider_" + e.layer.id),{"initialStart":e.layer.opacity});
        if (e.layer.wfs_url) {
            var before_layer = null;
            $.each(self.layers,function(index,layer) {
                if (!layer.selected) {
                    return;
                }
                if (layer.name == e.layer.name) {
                    if (before_layer) {
                        $(_vectorlayer_template(layer)).insertAfter($("#vectorlayer_" + before_layer.id));
                        return false;
                    } else {
                        $("#vectorlayerlist").prepend( _vectorlayer_template(layer));
                        return false;
                    }
                } 

            });
        }
    });

    var _change_opacity = function() {
        var layer = self.getLayer($(this).attr("layer"));
        var opacity = $("#opacity_" + layer.id).val();
        self.on({"name":"change_opacity","layer":layer,"opacity":opacity});
    }

    //initialize the layerlist table and activelayerlist table
    self.on("init_map_view",function(e,listener_chain) {
        _layer_template = Handlebars.compile($("#layer_template").html());
        _activelayer_template = Handlebars.compile($("#activelayer_template").html());
        //init table for layers
        _layers_table = $("#layerlist").DataTable({
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
            aaData: self.layers,
            columnDefs:[
                {
                    targets:0,
                    orderable:false,
                    data:"title",
                    render: function(data,type,full) {
                        return _layer_template(full);
                    }
                },
            ],
        });
        //remove search label from filter widget.
        $("#layerlist_filter label").replaceWith($("#layerlist_filter label input"));
        //attach event to select columns
        $("#layersetting_section").on('click',"table#layerlist td .select",_select_layer);

        //init table for active layers
        _activelayers_table = $("#activelayerlist")
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
            ordering:false,
            bInfo:false,
            rowReorder: {
                selector:'tr .title',
                update:false,
            },
            columnDefs:[
                {
                    targets:0,
                    orderable:false,
                    data:"name",
                    render: function(data,type,full) {
                        return _activelayer_template(full);
                    }
                },
            ],
        });

        _activelayers_table.on("row-reorder",function(e,details,changes){
            if (details == null || details.length == 0) {
                //no row is moved
                return;
            }
            var layer = self.layers[details[0].oldPosition];
            self.on({"name":"move_layer","layer":layer,"newPosition":details[0].newPosition,"oldPosition":details[0].oldPosition});
        });

        _activelayers_table.on("init",function(){
            if (self.state.layers) {
                $.each(self.state.layers,function(index,layer){ 
                    new Foundation.Slider($("#slider_" + e.layer.id),{"initialStart":e.layer.opacity});
                });
            }
        });
        //attach event to select columns
        $("#layersetting_section").on('click',"table#activelayerlist td .remove",_remove_layer);


        $("#layersetting_section").on('moved.zf.slider',"table td .slider",_change_opacity);
        
    });

    //initialize the feature list
    self.on("init_map_view",function(e,listener_chain) {
        _vectorlayer_template = Handlebars.compile($("#vectorlayer_template").html());
        $.each(self.layers,function(index,layer) {
            if (!layer.selected) {
                return;
            } else if(!layer.wfs_url) {
                return;
            }
            $("#vectorlayerlist").append( _vectorlayer_template(layer));
            
        });

        $("#vectorlayerlist").on("click","button", function() {
            var layer = self.getLayer($(this).attr("layer"));
            self.on({"name":"choose_vectorlayer","layer":layer});
            $("#feature").click();
        });
    });

    self.on("vectorlayer_choosed",function(e) {
        $("#vectorlayer_" + e.layer.id + " i").addClass("fi-check");
    });
    self.on("vectorlayer_unchoosed",function(e) {
        $("#vectorlayer_" + e.layer.id + " i").removeClass("fi-check");
    });
    self.on("interact_feature_inactive",function() {
        $("#vectorlayerlist").toggle(false);
    });

    self.on("interact_feature_active",function() {
        $("#vectorlayerlist").toggle(true);
    });

})(mudmap);
