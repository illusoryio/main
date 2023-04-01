/*
rpcProxy.js (c) 2023
Desc: Load rpc
Created:  2023-03-31T16:10:05.904Z
Modified: 2023-04-01T13:10:07.400Z
*/

async function rpcProxy(supc) {
    const supabaseClient = await supc;
    await supabaseClient
        .channel("proxies_restricted")
        .on("UPDATE", (payload) => {
            const proxy_name = payload.new.proxy_name;
            const auth_method = payload.new.auth_method;
            const auto_change = payload.new.auto_change;
            const auto_change_time = payload.new.auto_change_time;
            const h_port = payload.new.h_port;
            const h_threads = payload.new.h_threads;
            const isp = payload.new.isp;
            const last_auto_check = payload.new.last_auto_check;
            const last_ip_change = payload.new.last_ip_change;
            const last_reboot = payload.new.last_reboot;
            const loc = payload.new.location;
            const next_ip_change = payload.new.next_ip_change;
            const online = payload.new.online;
            const online_webhook = payload.new.online_webhook;
            const password = payload.new.password;
            const product = payload.new.product;
            const proxy_admin = payload.new.proxy_admin;
            const s_port = payload.new.s_port;
            const s_threads = payload.new.s_threads;
            const server_ip = payload.new.server_ip;
            const traffic = payload.new.traffic;
            const username = payload.new.username;
            const whitelist = payload.new.whitelist;

            console.log(payload);

            if (traffic < 1024) {
                var suffix = "Bytes";
                var divider = 1;
            } else {
                if (traffic >= 1024 && traffic < 1048576) {
                    var suffix = "KB";
                    var divider = 1024;
                } else {
                    if (traffic >= 1048576 && traffic < 1073741824) {
                        var suffix = "MB";
                        var divider = 1048576;
                    } else {
                        if (traffic >= 1073741824 && traffic < 1099511627776) {
                            var suffix = "GB";
                            var divider = 1073741824;
                        } else {
                            if (traffic >= 1099511627776) {
                                var suffix = "TB";
                                var divider = 1099511627776;
                            }
                        }
                    }
                }
            }

            if (traffic < 1024) {
                var divided = parseInt(traffic) / parseInt(divider);
                var converted = divided + " " + suffix;
            } else {
                var divided = parseInt(traffic) / parseInt(divider);
                var converted = divided.toFixed(2) + " " + suffix;
            }
            document.querySelector("[crd_ports=" + proxy_name + "]").innerHTML =
                "HTTP " + h_port + " • " + "SOCKS5 " + s_port;
            document.querySelector("[crd_isp=" + proxy_name + "]").innerHTML = isp;
            document.querySelector("[crd_loc=" + proxy_name + "]").innerHTML = loc;
            document.querySelector("[crd_threads=" + proxy_name + "]").innerHTML =
                parseInt(h_threads) + parseInt(s_threads) + " threads";
            document.querySelector("[crd_traffic=" + proxy_name + "]").innerHTML =
                converted;

            var autoChange = auto_change;
            if (autoChange == true) {
                document
                    .querySelector("[crd_auto=" + proxy_name + "]")
                    .classList.remove("grey");
                document
                    .querySelector("[crd_auto=" + proxy_name + "]")
                    .classList.remove("auto_change_off");
                document
                    .querySelector("[crd_auto=" + proxy_name + "]")
                    .classList.add("green");
                document
                    .querySelector("[crd_auto=" + proxy_name + "]")
                    .classList.add("auto_change_on");
                document.querySelector("[crd_auto=" + proxy_name + "]").innerHTML =
                    "auto-change updating";
                document
                    .querySelector("[crd_auto=" + proxy_name + "]")
                    .setAttribute("datetime", next_ip_change);
            } else {
                timeago.cancel(document.querySelector("[crd_auto=" + proxy_name + "]"));
                document
                    .querySelector("[crd_auto=" + proxy_name + "]")
                    .classList.remove("green");
                document
                    .querySelector("[crd_auto=" + proxy_name + "]")
                    .classList.remove("auto_change_on");
                document
                    .querySelector("[crd_auto=" + proxy_name + "]")
                    .classList.add("grey");
                document
                    .querySelector("[crd_auto=" + proxy_name + "]")
                    .classList.add("auto_change_off");
                document.querySelector("[crd_auto=" + proxy_name + "]").innerHTML =
                    "auto-change off";
                document
                    .querySelector("[crd_auto=" + proxy_name + "]")
                    .setAttribute("datetime", "");
            }
            document
                .querySelector("[crd_last_ip_change=" + proxy_name + "]")
                .setAttribute("datetime", last_ip_change);
            document
                .querySelector("[crd_last_reboot=" + proxy_name + "]")
                .setAttribute("datetime", last_reboot);

            var queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
            var current_proxy = urlParams.get("proxy");

            if (current_proxy == proxy_name) {
                $("#currentProxy").html(proxy_name);
                $("#cp-autoMinOnly").val(auto_change_time);
                $("#cp-isp").html(isp);
                $("#cp-loc").html(loc);
                $("#cp-threads").html(s_threads + h_threads + " Threads");
                $("#cp-traffic").html(traffic);
                // $("#cp-lastReset").html(last_ip_change);
                // $("#cp-lastReboot").html(last_reboot);
                $("#cp-lastReset").attr("datetime", last_ip_change);
                $("#cp-lastReboot").attr("datetime", last_reboot);
                $("#uname").html(username);
                $("#pword").html(password);
                $("#unameInput").val(username);
                $("#pwordInput").val(password);
                $("#whitelistIp").val(whitelist);
                $("#serverIp").html(server_ip);
                $("#httpPort").html(h_port);
                $("#socksPort").html(s_port);

                timeago.cancel(document.getElementById("cp-lastReset"));
                timeago.cancel(document.getElementById("cp-lastReboot"));

                async function loadModalItems() {
                    await modal_time_ago();
                }
                loadModalItems();
            }

            async function otherFuntions() {
                await getTimeAgoManual();
                await getTimeAgoReboot();
                if (auto_change == true) {
                    await getTimeAgoAuto();
                }
            }
            otherFuntions();
        })
        .subscribe();
}