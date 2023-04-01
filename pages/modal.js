/*
modal.js (c) 2023
Desc: Modal controller
Created:  2023-04-01T14:54:29.478Z
Modified: 2023-04-01T21:44:58.851Z
*/

// Modal interact

async function interact(clicked_object) {
    await openModal();

    $(".prx_crd_v2").css({
        border: "1px solid #111314",
        "background-color": "#080909",
        transition: ".1s",
    });

    $(clicked_object).css({
        border: "#6dffa8 0.15rem solid",
        "background-color": "#141517",
        transition: ".1s",
    });

    var proxy = clicked_object.getAttribute("interact");
    const { data, error } = await supabaseClient
        .from("proxies_restricted")
        .select()
        .eq("proxy_name", proxy);

    return new Promise((resolve) => {
        if (error) {
            $("#successMsg").hide();
            $("#errorMsg").hide();
            $("#errorMsg").show();
            $("#errorTxt").html(error.response.data.message);
            console.error(error);
        } else {
            window.localStorage.setItem("currentProxy", proxy);

            document.title = proxy; // New title :)

            // Construct URLSearchParams object instance from current URL querystring.
            var queryParams = new URLSearchParams(window.location.search);
            // Set new or modify existing parameter value.
            queryParams.set("proxy", proxy);
            // Replace current querystring with the new one.
            history.replaceState(null, null, "?" + queryParams.toString());

            var online = data[0].online;
            var username = data[0].username;
            var password = data[0].password;
            var serverIp = data[0].server_ip;
            var hport = data[0].h_port;
            var sport = data[0].s_port;
            var onlineWh = data[0].online_webhook;
            var whitelist = data[0].whitelist;
            var lastIpChange = data[0].last_ip_change;
            var lastReboot = data[0].last_reboot;
            var sConn = data[0].s_threads;
            var hConn = data[0].h_threads;
            var loc = data[0].location;
            var isp = data[0].isp;
            var traffic = data[0].traffic;
            var autoChangeVal = data[0].auto_change;
            var autoMinOnly = data[0].auto_change_time;
            var authMethodVal = data[0].auth_method;

            $("#currentProxy").html(proxy);
            $("#cp-autoMinOnly").val(autoMinOnly);
            $("#cp-isp").html(isp);
            $("#cp-loc").html(loc);
            $("#cp-threads").html(sConn + hConn + " Threads");
            $("#cp-traffic").html(traffic);
            $("#cp-lastReset").html(lastIpChange);
            $("#cp-lastReboot").html(lastReboot);
            $("#cp-lastReset").attr("datetime", lastIpChange);
            $("#cp-lastReboot").attr("datetime", lastReboot);
            $("#uname").html(username);
            $("#pword").html(password);
            $("#unameInput").val(username);
            $("#pwordInput").val(password);
            $("#whitelistIp").val(whitelist);
            $("#serverIp").html(serverIp);
            $("#httpPort").html(hport);
            $("#socksPort").html(sport);

            if (online == true) {
                $("#cp-online").show();
                $("#cp-offline").hide();
            } else {
                $("#cp-online").hide();
                $("#cp-offline").show();
            }

            if (authMethodVal == "creds") {
                $("#userPassSel").click();
                $("#authMethodConf").html("Username & Password Selected");
            } else {
                $("#whitelistIpSel").click();
                $("#authMethodConf").html("Whitelist IP Selected");
            }

            if (username == null) {
                $("#userPassSelNone").show();
                $("#userPassSelSet").hide();
            } else {
                $("#userPassSelNone").hide();
                $("#userPassSelSet").show();
            }

            if (whitelist == null) {
                $("#whitelistSelNone").show();
                $("#whitelistSelSet").hide();
            } else {
                $("#whitelistSelNone").hide();
                $("#whitelistSelSet").show();
            }

            if (autoChangeVal == true) {
                $("#autoChangeOn").css("display", "flex");
                $("#autoChangeOnLine, #autoChangeOnRow").show();
                $("#autoChangeOff").hide();
            } else {
                $("#autoChangeOff").css("display", "flex");
                $("#autoChangeOn, #autoChangeOnLine, #autoChangeOnRow").hide();
            }

            $("#auth_options").hide();

            async function loadModalItems() {
                await modal_time_ago();
                await hide_skel_mod();
            }
            loadModalItems();
        }
        setTimeout(() => {
            resolve("Got modal details...");
        }, 100);
    });
}

// Modal open/close

async function modalStart() {
    return new Promise((resolve) => {
        const prxMod = document.getElementById("prx_mod");
        prxMod.setAttribute("open", false);
        setTimeout(() => {
            resolve("Set open: false.");
        }, 100);
    });
}

async function openModal() {
    await show_skel_mod();
    return new Promise((resolve) => {
        $("#prx_mod").css("display", "flex");
        $(".crd_wrp").hide();
        const prxMod = document.getElementById("prx_mod");
        prxMod.setAttribute("open", true);
        setTimeout(() => {
            resolve("Opened");
        }, 100);
    });
}

async function closeModal() {
    return new Promise((resolve) => {
        const prxMod = document.getElementById("prx_mod");
        $("#prx_mod").hide();
        $(".crd_wrp").show();
        $(".auth-select-wrap").hide();
        $(".webhook-online-trigger-wrap").hide();
        prxMod.setAttribute("open", false);
        setTimeout(() => {
            resolve("Closed");
        }, 100);
    });
}