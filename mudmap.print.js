(function(mudmap) {
    var self = mudmap;

    /*
     *  param scale_bar_len: the length of the scale bar in mm.
     *  return the scale bar meta data
     */
    var suggested_minor_bar_scale = [2,5,10,20,30,40,50,100,150,200,300,400,500,600,800,
                                    1000,1200,1400,1800,2000,2500,3000,3500,4000,4500,5000,5500,
                                    6000,6500,7000,7500,8000,8500,9000,9500,10000,11000,12000,
                                    13000,14000,15000,16000,17000,18000,19000,20000,21000,22000,23000,24000,25000,26000,27000,28000,29000];


    for(var suggested_scale = 30000; suggested_scale < 500000;suggested_scale += 10000) {
        suggested_minor_bar_scale.push(suggested_scale);
    }

    var get_scale_bar_metadata = function(scale,max_bar_len) {
        var min_minor_bar_len = 10; 
        var min_minor_bar_numbers = 3;
        var min_major_bar_numbers = 3;

        var min_total_minor_bar_numbers = min_minor_bar_numbers * min_major_bar_numbers;
        var minor_bar_len = max_bar_len / min_total_minor_bar_numbers;
        if (minor_bar_len < min_minor_bar_len) {
            throw "bar len is too small";
        }
        var minor_bar_scale = minor_bar_len * scale / 1000;
        var adjusted_minor_bar_scale = null;
        for(var i = 0;i < suggested_minor_bar_scale.length;i++) {
            if (suggested_minor_bar_scale[i] > minor_bar_scale) {
                if (i == 0) {
                    throw "scale is too small";
                }
                adjusted_minor_bar_scale = suggested_minor_bar_scale[i - 1];
                break;
            }
        }
        if (adjusted_minor_bar_scale == null) {
            throw "scale is too large";
        }
        var adjusted_minor_bar_len = adjusted_minor_bar_scale * 1000 / scale;
        var scale_unit = null;
        if (adjusted_minor_bar_scale <= 500) {
            scale_unit = "m";
        } else {
            scale_unit = "km";
            adjusted_minor_bar_scale = adjusted_minor_bar_scale / 1000;
        }
        return {minor_bar_len:adjusted_minor_bar_len, minor_bar_numbers:min_minor_bar_numbers, major_bar_numbers:min_major_bar_numbers, minor_bar_scale:adjusted_minor_bar_scale, scale_unit:scale_unit}
    }

    var compass_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABL1BMVEUAAACTNDSJISGSISGbMDCbOjqkOzudIiKDCQmrOzuNCQmjIiKqQkKxPj57CAi0QkKkMzO8QUF7BgaTGhqpMTGdExOzMTHFRESDBgZzBgbESEiiFRW9MjJqBgaSCQmrExOhHh6cCgqzExO9Ojp2CAiiCwu2GhqdGBhiBgarDAy6GxvCMzO8IyOeBgbFOjq+KirBKyuMBgZqCAjAIyO7ExPAHh6UBQWtBQW0CwumBQWTERG7Dg51ExOjSkqiKiqLEhKCEBB8HByBODjKxcXW09Pt6ur+/v7i6enN0tLEycnDwsK9ubm1sbGuqKimoKCknZ3c2trj4eHMycm9wMC5tLSyq6uqoqKemJiak5Pe4eHCvLzp5eXh3d3x7u6Si4vZ1NTSzMyXkZGonp65r69bBQWq79QNAAAAAXRSTlMAQObYZgAAAAFiS0dEZMLauAkAAALXSURBVGje7dXretJAEAbgVWubpppKFElsC00MVZKUg61tracqxEOAEjChmoCg3v89OLsbKo9/nfklcwH7PvPNTMLYqla1qv+vbtykBm4RA2vEwO31DYUW2NxQSYH1zS1a4M7dLVUjfH9te5sWuLdd2FJ1SqBAC9x/IAC6jIoPSwAYJiHwCACFDtjZ5YBu7hG9X67QA6XCvqKbVBlZ9m7p8b6hO0QtqNUDAJ4YpmM+pUmo5noc0KgAq+YLQKcCDm3fq+8KYI9CKFftRl0AmknSQrl2wIGiACjWyLLdpldvFHlEFAAkBCMQAKwRQUawpA2v7gnAdBz8FqwaJOR5ftHQNN1x0L8WMqEc0AhuLQeafrGlCAEbsOQImm5RlcAzbKAiRtB0LVVRFA7gCjwhDhwdVyWA3YIYATRwZC8ADRewahJ4bouIFOwxl6sSOHKhAzWfAuatnVRPbb/RbLrHZ1W11TIMQ9d1RKB18uL0zPUbPgCHrRYXAED84p1bAvB99+US4LxCA16/qdhwZ3zI7s75W6iLiwvt3Xs0oN0JPizq46fPYdjt9nr9ywEa0A2ja2E4CsMv3biXjK++ogFsCfg2Eg0k/THi+yztZAsgCgGABvoDTICNJtMF0A7DVACY7y9lBEAqOrhCBf5kJIE4QR0Bz2h4PYNUAIPvuEA4CRYdpCIi3BHAKcz+ApATYvE8W55BMv6BDLB2vqg5cIn9/vWiQkRdEqArF3WaA9gzZnxReUaBHHKC/36eUTADII7HBAAc83QqO6ABIKMgCDLRQUICQEYLgOR9ls6yIJPATxIgHk2ybNKBQ4sJllRmBMAcOqBYUpnRcBgBQHIFIqN5NInmIdWModrRZDaChMiAtBPNCEcAGbVnAMR9MiBJ5zDjHllCfMwA0CXEM5qHZEvKK0nbhEsqWqBcUtkCaUKMjYn+NUvAL1qAJbQJQQvEDbAB0b9mVata1b/Ub31izGC0EgOrAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA1LTEwVDA2OjQxOjI5KzAyOjAwM+4O8gAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNi0wNS0xMFQwNjo0MToyOSswMjowMEKztk4AAAAASUVORK5CYII=";

    self.print = function() {
        self.on(["pre_print","print","post_print"]);
    }
    self.on("print", function(e,listener_chain) {
        // 10 mm shorter than A3 to allow for a text line at bottom
        var dim = [ 420, 287 ];
        var width = self.toPixel(dim[0]);
        var height = self.toPixel(dim[1]);
        var size = self.map.getSize();
        var extent = self.map.getView().calculateExtent(size);
        var resolution = self.map.getView().getResolution();
        var print_scale = self.get_fixed_scale();
        var print_extent = self.map.getView().calculateExtent([width,height]);
        self.deinteract();
        self.map.setSize([ width, height ]);
        self.map.getView().fit(print_extent, [width,height]);
        self.map.renderSync();
        self.set_scale(print_scale);
        window.setTimeout(function() {
            var pdf = new jsPDF("landscape", undefined, "a3");
            // Use jpeg at 0.92 quality for a bit of compression so PDF's aren't huge
            try {
                try {
                    pdf.addImage($("canvas")[0].toDataURL("image/jpeg", .92), "JPEG", 0, 0, dim[0], dim[1]);
                } finally {
                    self.map.setSize(size);
                    self.map.getView().fit(extent, size);
                    self.map.renderSync();
                    self.map.getView().setResolution(resolution);
                }
                pdf.addImage(compass_img, "PNG", 400, 3, 16,16);
                pdf.setFontSize(16);
                if (self.state.lastsave) {
                    pdf.text(2, 294, "SSS Mudmap - " + self.map_name + " (" + self.user.email + ") modified " + self.state.lastsave);
                } else {
                    pdf.text(2, 294, "SSS Mudmap - " + self.map_name + " (" + self.user.email + ")");
                }
                //scale data
                pdf.text(230, 294, "Scale " + self.get_scale_text(print_scale) + " GDA94");
                //scale bar
                var scale_bar_metadata = get_scale_bar_metadata(print_scale,100);
                var x = 310;
                var scale_value = 0;
                var formated_scale_value = null;
                var offset_per_letter = 2;
                pdf.setFont("courier");
                pdf.setFontType("normal");
                pdf.setFontSize(12);
                function format_scale(scale) {
                    if (Math.round(scale) - scale < 0.001) {
                        return Math.round(scale).toString();
                    } else if(scale.toFixed(2) - scale < 0.001) {
                        return scale.toFixed(1).toString();
                    } else {
                        return scale.toFixed(2).toString();
                    }
                }
                for(var i = 0;i < scale_bar_metadata["minor_bar_numbers"];i++) {
                    pdf.setDrawColor(0);
                    if (i % 2 == 0) {
                        pdf.setFillColor(255,255,255);
                    } else {
                        pdf.setFillColor(255,0,0);
                    }
                    pdf.rect(x,288,scale_bar_metadata["minor_bar_len"],3,'FD');
                    formated_scale_value = format_scale(scale_value);
                    pdf.text(x - Math.floor(formated_scale_value.length / 2) * offset_per_letter,295,formated_scale_value);
                    scale_value += scale_bar_metadata["minor_bar_scale"];
                    x += scale_bar_metadata["minor_bar_len"];
                }
                for(var i = 1;i < scale_bar_metadata["major_bar_numbers"];i++) {
                    pdf.setDrawColor(0);
                    if (i % 2 == 0) {
                        pdf.setFillColor(255,255,255);
                    } else {
                        pdf.setFillColor(0,0,0);
                    }
                    pdf.rect(x,288,scale_bar_metadata["minor_bar_len"] * scale_bar_metadata["minor_bar_numbers"],3,'FD');
                    formated_scale_value = format_scale(scale_value);
                    pdf.text(x - Math.floor(formated_scale_value.length / 2) * offset_per_letter,295,formated_scale_value);
                    scale_value += scale_bar_metadata["minor_bar_scale"] *  scale_bar_metadata["minor_bar_numbers"];
                    x += scale_bar_metadata["minor_bar_len"] * scale_bar_metadata["minor_bar_numbers"];
                }
                formated_scale_value = format_scale(scale_value);
                pdf.text(x - Math.floor(formated_scale_value.length / 2) * offset_per_letter,295,formated_scale_value + "(" + scale_bar_metadata["scale_unit"] + ")");
                if (self.state.lastsave) {
                    pdf.save(self.map_key + "_" + self.state.lastsave + ".pdf");
                } else {
                    pdf.save(self.map_key + ".pdf");
                }
            } catch(err) {
                alert(err);
            } finally {
                $("#export-pdf").prop("disabled", false);
                listener_chain.call();
            }
        }, 5e3);
    });
})(mudmap);
