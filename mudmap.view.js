(function(mudmap) {
    var self = mudmap;

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

    // Create interactions, add them to map
    self.on("post_init",function() {
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
    });

    self.on("layers_loaded",function(e,listener_chain) {
        $("#layerlist").DataTable({
            bPaginate:false,
            bAutoWidth:false,
            bProcessing:false,
            bServerSide:false,
            bInfo:false,
            aaData: self.layers,
            aoColumnDefs:[
                {
                    targets:0,
                    data:"selected",
                    orderable:false,
                    calssName:"sorting_disabled",
                    mRender: function(data,type,full) {
                        return '<i class="' + (data?"fi-check":"fi-x") + '" onclick="$(this).toggleClass(\'fi-x fi-check\')"></i>';
                    }
                },
                {
                    targets:1,
                    orderable:false,
                    data:"name"
                },
                {
                    targets:2,
                    orderable:false,
                    data:null,
                    mRender: function(data,type,full) {
                        return '<i class="fi-plus"></i>';
                    }
                }
            ],
        });
    });
})(mudmap);
