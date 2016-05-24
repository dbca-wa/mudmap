(function(mudmap) {
    var self = mudmap;

    //supported fixed scales
    self.fixed_scales = [1000,2000,2500,5000,10000,20000,25000,50000,80000,100000,125000,250000,500000,1000000,2000000,3000000,5000000,10000000,25000000];
    
    //set scale, in meters
    self.set_scale = function(scale) {
        var size = self.map.getSize();
        if (size[0] > size[1]) {
            var bigsize = size[0]
        } else {
            var bigsize = size[1]
        }
        var width = self.toMillimeter(bigsize);
        var distance = scale * width / 1000 / 2 / 1000; //in kilometers
        var center = self.map.getView().getCenter();
        var extent = turf.extent(turf.buffer(turf.point(center),distance,'kilometers'));
        self.map.setSize([bigsize, bigsize])
        self.map.getView().setResolution(self.map.getView().getResolutionForExtent(extent, self.map.getSize()));
        self.map.setSize(size)
    }

    //return the scale, in meters
    self.get_scale = function() {
        var center = self.map.getView().getCenter();
        var size = self.map.getSize();
        var width = self.toMillimeter(size[0]);
        var extent = self.map.getView().calculateExtent(size);
        var distance = turf.distance(turf.point([extent[0],center[1]]),turf.point(center),'kilometers') * 2;
        return distance * 1000 * 1000 / width;
    }


    //get a fixed scale which is not smaller than the current scale.
    //but if scale is too small, use the smallest scale
    self.get_fixed_scale = function() {
        var scale = self.get_scale();
        var clampedScale = 1000;
        $.each(self.fixed_scales, function(index, value) {
            if (value > scale) {
                clampedScale = value;
                return false;
            }
        });
        return clampedScale;
    };
    
    //return scale string
    self.get_scale_text = function(scale) {
        var scale = Math.round(scale);
        if (scale < 1000) {
            return "1:" + numeral(scale).format('0,0') + "m";
        } else {
            scale = Math.round(scale / 10) / 100;
            return "1:" + numeral(scale).format('0,0') + "km";
        }
    }


})(mudmap);

