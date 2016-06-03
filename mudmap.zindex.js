(function(mudmap) {
    var self = mudmap;

    //the min z index for tile layer
    var _zindex_min = 10001;
    //the max z index for tile layer
    var _zindex_max = 100000000;
    //the initial interval between two adjacent tile layer's z index. 
    //this is used to improve the performance by only modifing the affected layer's z index instead of changing all of the layer's z index
    var _zindex_interval = 4096;

    //get the layer's zindex based on up layer z index and down layer z index
    //In the first, all layer's z index will get the value by adding or minus "_zindex_interval" from the neighbour's zindex value.
    //if up_layer z index is null, means the layer will be added to the top
    //if down_layer z index is null, means the layer will be added to the bottom
    //if both up_layer z index and down_layer z index are null, means this is the first layer
    //return the z index, if successfully;otherwise,return null, means all layer's z index need to be recalculated again.
    var _getZIndex = function(up_layer_index,down_layer_index) {
        if (up_layer_index != null && down_layer_index != null) {
            var zindex = Math.floor((up_layer_index - down_layer_index) / 2) + down_layer_index
            if (zindex == down_layer_index) {
                //no more space to insert a new layer, recalculated all layer's z index
                return null;
            } else {
                return zindex;
            }
        } else if (up_layer_index == null && down_layer_index == null) {
            //try to get a zindex in the middle value of the avaialbe z index range 
            var maximum_layers = Math.floor((_zindex_max - _zindex_min) / _zindex_interval)
            //assume we can have maximum 1000 active layers. and try to get the first layers z index at the middle place
            return (Math.floor((maximum_layers - 1000) / 2) * _zindex_interval) + _zindex_min;
        } else if (up_layer_index == null) {
            var zindex = down_layer_index + _zindex_interval;
            if (zindex > _zindex_max) {
                //no more space to add a new layer at the top, recalculated all layers' z index
                return null;
            } else {
                return zindex;
            }
        } else {
            var zindex = up_layer_index - _zindex_interval;
            if (zindex < _zindex_min) {
                //no more space to add a new layer at the bottom, recalculated all layers' z index
                return null;
            } else {
                return zindex;
            }
        }
    }

    var _resetZIndex = function() {
        if (!self.state.layers || self.state.layers.length == 0) {
            return;
        }
        var zindex = null;
        for (var i = self.state.layers.length - 1;i >= 0; i--) {
            zindex = _getZIndex(null,zindex);
            self.state.layers[i].zindex = zindex;
            if (self.map) {
                self.getTileLayer(self.state.layers[i].name).setZIndex(zindex);
            }
        }
    }

    self.on("set_state",function(e) {
        if (self.state.layers) {
            _resetZIndex();
        }
    });

    self.on("pre_add_layer",function(e) {
        var zindex = null;
        if (self.state.layers && self.state.layers.length > 0) {
            zindex = _getZIndex(null,self.state.layers[0].zindex);
        } else {
            zindex = _getZIndex(null,null);
        }
        if (zindex == null) {
            _resetZIndex();   
            zindex = _getZIndex(null,self.state.layers[0].zindex);
        } 
        e.layer.zindex = zindex;
    });

    self.on("remove_layer",function(e) {
        e.layer.zindex = null;
    });

    self.on("move_layer",function(e){
        if (Math.abs(e.newPosition - e.oldPosition) == 1) {
            var oldZindex = self.state.layers[e.oldPosition].zindex;
            self.state.layers[e.oldPosition].zindex = self.state.layers[e.newPosition].zindex;
            self.getTileLayer(self.state.layers[e.oldPosition].name).setZIndex(self.state.layers[e.newPosition].zindex);

            self.state.layers[e.newPosition].zindex = oldZindex;
            self.getTileLayer(self.state.layers[e.newPosition].name).setZIndex(oldZindex);

        } else if (e.oldPosition > e.newPosition){
            //move up
            var zindex = _getZIndex( (e.newPosition == 0)?null:self.state.layers[e.newPosition - 1].zindex,self.state.layers[e.newPosition].zindex );
            if (zindex == null) {
                _resetZIndex();
                zindex = _getZIndex( (e.newPosition == 0)?null:self.state.layers[e.newPosition - 1].zindex,self.state.layers[e.newPosition].zindex );
            }

            self.state.layers[e.oldPosition].zindex = zindex;
            self.getTileLayer(self.state.layers[e.oldPosition].name).setZIndex(zindex);
        } else {
            //move down
            var zindex = _getZIndex(self.state.layers[e.newPosition].zindex,(e.newPosition == self.state.layers.length - 1)?null:self.state.layers[e.newPosition + 1].zindex);
            if (zindex == null) {
                _resetZIndex();
                zindex = _getZIndex(self.state.layers[e.newPosition].zindex,(e.newPosition == self.state.layers.length - 1)?null:self.state.layers[e.newPosition + 1].zindex);
            }

            self.state.layers[e.oldPosition].zindex = zindex;
            self.getTileLayer(self.state.layers[e.oldPosition].name).setZIndex(zindex);
        }
        self.state.layers.splice(e.newPosition,0,self.state.layers.splice(e.oldPosition,1)[0]);
    });

})(mudmap);
