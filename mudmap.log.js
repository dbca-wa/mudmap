(function(mudmap) {
    var self = mudmap;

    self.NOTSET =  0;
    self.DEBUG =  10;
    self.INFO =  20;
    self.WARNING =  30;
    self.ERROR =  40;
    self.CRITICAl =  50;


    self.logLevel = self.DEBUG; 

    self.infoable = function() {
        return self.logLevel <= self.INFO;
    }
    self.debugable = function() {
        return self.logLevel <= self.DEBUG;
    }
    self.warningable = function() {
        return self.logLevel <= self.WARNING;
    }
    self.errorable = function() {
        return self.logLevel <= self.ERROR;
    }
    self.criticalable = function() {
        return self.logLevel <= self.CRITICAL;
    }
    self.info = function(msg) {
        if (self.logLevel <= self.INFO) {
            console.log("INFO:" + msg);
        }
    }
    self.debug = function(msg) {
        if (self.logLevel <= self.DEBUG) {
            console.log("DEBUG:" + msg);
        }
    }
    self.warning = function(msg) {
        if (self.logLevel <= self.WARNING) {
            console.log("WARNING:" + msg);
        }
    }
    self.error = function(msg) {
        if (self.logLevel <= self.ERROR) {
            console.log("ERROR:" + msg);
        }
    }
    self.critical = function(msg) {
        if (self.logLevel <= self.CRITICAL) {
            console.log("CRITICAL:" + msg);
        }
    }

})(mudmap);
