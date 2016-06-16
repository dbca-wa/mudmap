(function(mudmap) {
    var self = mudmap;

    var _monitor_jobs = {};


    var _endpoint = null;
    var _servers = null;
    self.on("pre_load",function() {
        if (self.production) {
            _endpoint = "https://mudmap.dpaw.wa.gov.au/api/publishs/";
            _servers = ["wann-kmi-001","aws-kmi-raw","aws-kmi-2b","aws-kmi-2a"];
        } else {
            _endpoint = "https://mudmap-uat.dpaw.wa.gov.au/api/publishs/";
            _servers = ["aws-borgslave-test2"];
        }

        var servers = {};
        $.each(_servers,function(index,server) {
            servers[server] = true;
        });

        _servers = servers;
    });

    var _monitor = function(layerName,publishCallback,unpublishCallback) {
        var job = _monitor_jobs[layerName] 
        $.ajax({
            url : _endpoint + layerName + "/",
            contentType: "application/json",
            dataType:"json",
            success:function(sync_data) {
                var outofsync_servers = null;
                //recorver the date 
                if (sync_data["publish"]) {
                    if (sync_data["publish"]["publish_time"]) {
                        sync_data["publish"]["publish_time"] = new Date(sync_data["publish"]["publish_time"]);
                    }

                    if (sync_data["publish"]["deploy_time"]) {
                        sync_data["publish"]["deploy_time"] = new Date(sync_data["publish"]["deploy_time"])
                    }
                }

                if (sync_data["publish"] && sync_data["publish"]["outofsync_servers"]) {
                    $.each(sync_data["publish"]["outofsync_servers"],function(index,data){
                        outofsync_servers = outofsync_servers || {}
                        if (data["deploy_time"]) {
                            data["deploy_time"] = new Date(data["deploy_time"]);
                        }
                        if (data["sync_time"]) {
                            data["sync_time"] = new Date(data["sync_time"]);
                        }
                        if (data["last_poll_time"]) {
                            data["last_poll_time"] = new Date(data["last_poll_time"]);
                        }
                        if (data["last_sync_time"]) {
                            data["last_sync_time"] = new Date(data["last_sync_time"]);
                        }
                        outofsync_servers[data["server"]] = data;
                    })
                    sync_data["publish"]["outofsync_servers"] = outofsync_servers;
                }

                var previous_sync_data = job["sync_data"] ;
                var sync_failed_servers = null;
                if (outofsync_servers) {
                    //some servers are not synchronized
                    var previous_server_sync_data = null;
                    var sync_failed = false;
                    //remove the outofsync servers which is under syncing or is not in the server list.
                    $.each(outofsync_servers,function(server,server_sync_data) {
                        if (previous_sync_data && previous_sync_data["publish"] && previous_sync_data["publish"]["outofsync_servers"]) {
                            previous_server_sync_data = previous_sync_data["publish"]["outofsync_servers"][server];
                        } else {
                            previous_server_sync_data = null;
                        }
                        sync_failed = false;

                        if (!_servers || _servers[server]) {
                            if (server_sync_data["sync_jobid"] != null) {
                                sync_failed = true;
                            } else if (previous_server_sync_data
                                && previous_server_sync_data["last_poll_time"] 
                                && server_sync_data["last_poll_time"] 
                                && server_sync_data["last_poll_time"] > previous_server_sync_data["last_poll_time"] 
                                && server_sync_data["deploied_jobid"] == previous_sync_data["deploied_jobid"]
                                && server_sync_data["sync_jobid"] == previous_sync_data["sync_jobid"]) {
                                sync_failed = true
                                server_sync_data["sync_message"] = "sync failed."

                            } else if (server_sync_data["last_poll_time"]
                                && new Date().getMilliseconds() - server_sync_data["last_poll_time"].getMilliseconds() > 12 * 60 * 60 * 1000) {
                                sync_failed = true
                                server_sync_data["sync_message"] = "sync stopped."
                            }
                            if (sync_failed) {
                                sync_failed_servers = sync_failed_servers || [];
                                sync_failed_servers.push(server_sync_data);
                            }
                        }
                    });
                }

                if ( !sync_data["publish"] || !sync_data["publish"]["deploied_jobid"]) {
                    //not published
                    if (previous_sync_data && previous_sync_data["publish"] && previous_sync_data["publish"]["deploied_jobid"]) {
                        //unpublished
                        if (unpublishCallback) {
                            unpublishCallback(sync_data);
                        }
                    }
                } else if (!previous_sync_data
                        || !previous_sync_data["publish"] 
                        || !previous_sync_data["publish"]["deploied_jobid"] 
                        || sync_data["publish"]["deploied_jobid"] != previous_sync_data["publish"]["deploied_jobid"] ){
                    //new data is published and all servers are synchronized
                    if (publishCallback) {
                        publishCallback(sync_data);
                    }
                }
                var messages = null;
                if (sync_data["publishing_failed"]) {
                    messages = "Publishing failed.\r\n" + sync_data["publishing_message"];
                }
                if (sync_failed_servers) {
                    if (messages != null) {
                        messages = "\r\n-------------------------------------------------------------------\r\n";
                    } else {
                        messages = "";
                    }
                    messages = messages + "Some slave server sync failed.";
                    $.each(sync_failed_servers,function(index,server_sync_data) {
                        if (index > 0) {
                            messages += "\r\n-------------------------------------------------------------------------";
                        }
                        messages += "\r\n\t"+server_sync_data["server"] + "\r\n\t" + server_sync_data["sync_message"];
                    });

                }
                if (messages != null) {
                    window.alert(messages);
                }

                job["sync_data"] = sync_data;
            }
        })
    }

    //monitor the sync status of the layer with interval(seconds), at  least 60 seconds
    self.startMonitorSync = function(layerName,monitorInterval,publishCallback,unpublishCallback) {
        var job = _monitor_jobs[layerName] 
        if (job) {
            //stop the previous job first
            clearInterval(job["handler"])
        }
        if (!monitorInterval || monitorInterval < 60) {
            monitorInterval = 60;
        }
        job = {};
        _monitor_jobs[layerName] = job;
        job["handler"] = setInterval(function(){
            _monitor(layerName,publishCallback,unpublishCallback);
        },monitorInterval * 1000)

        _monitor(layerName,publishCallback,unpublishCallback);
    }

    self.stopMonitorSync = function(layerName) {
        job = _monitor_jobs[layerName] 
        if (job) {
            //stop the previous job first
            clearInterval(job["handler"])
        }
    }

})(mudmap);
