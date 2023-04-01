/*
dashboard.js (c) 2023
Desc: Dashboard scripts
Created:  2023-03-31T16:10:05.904Z
Modified: 2023-04-01T15:14:19.111Z
*/

// Load Clerk
async function loadClerk() {
    return new Promise((resolve) => {
        // Get this URL from the Clerk Dashboard
        const frontendApi = "clerk.a7i81.ec7ck.lcl.dev";
        const version = "@latest"; // Set to appropriate version

        // Creates asyncronous script
        const script = document.createElement("script");
        script.setAttribute("data-clerk-frontend-api", frontendApi);
        script.async = true;
        script.src = `https://${frontendApi}/npm/@clerk/clerk-js${version}/dist/clerk.browser.js`;
        // Adds listener to initialize ClerkJS after it's loaded
        script.addEventListener("load", async function () {
            await window.Clerk.load({
                // Set load options here...
            });
            console.log("Clerk initiated 🔒");
            clerkResolved();
        });
        document.body.appendChild(script);
        console.log('Clerk script loaded');
        setTimeout(() => {
            resolve();
        }, 100);
    });
}


//* Loads a JavaScript file and returns a Promise for when it is loaded

const lsc = (src, name) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.addEventListener("load", () => {
            resolve({ loaded: name + " loaded...", error: false });
        });
        script.onerror = reject;
        script.src = src;
        script.async = false;
        document.body.append(script);
    });
};

//* Scritps to load

async function lscSupaClient() {
    await lsc(
        "https://supa.illusory.io/storage/v1/object/public/js/supa/supaClient.js",
        "supaClient.js"
    )
        .then((val) => console.log(val))
        .catch((err) => console.error(err.message));
}

async function lscGetProxies() {
    await lsc("https://supa.illusory.io/storage/v1/object/public/js/proxies/getProxies.js",
        "getProxies.js"
    )
        .then((val) => console.log(val))
        .catch((err) => console.error(err.message));

}

async function lscTimeAgo() {
    await lsc("https://cdnjs.cloudflare.com/ajax/libs/timeago.js/4.0.2/timeago.full.min.js",
        "timeago.full.min.js"
    )
        .then((val) => console.log(val))
        .catch((err) => console.error(err.message));

}

async function lscClerkActions() {
    await lsc("https://supa.illusory.io/storage/v1/object/public/js/clerk/clerkActions.js",
        "clerkActions.js"
    )
        .then((val) => console.log(val))
        .catch((err) => console.error(err.message));

}

async function lscRpcProxy() {
    await lsc("https://supa.illusory.io/storage/v1/object/public/js/proxies/rpcProxy.js",
        "rpcProxy.js"
    )
        .then((val) => console.log(val))
        .catch((err) => console.error(err.message));

}


//* Other functions

// Plus Minus fields

$('.add_min').click(function () {
    if ($(this).prev().val() < 1440) {
        $(this).prev().val(+$(this).prev().val() + 1);
    }
});
$('.sub_min').click(function () {
    if ($(this).next().val() > 1) {
        if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
    }
});

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
        setTimeout(() => {
            const prxMod = document.getElementById("prx_mod");
            prxMod.setAttribute("open", false);
            resolve("Set open: false.");
        }, 100);
    });
}

async function openModal() {
    await show_skel_mod();
    return new Promise((resolve) => {
        setTimeout(() => {
            $("#prx_mod").css("display", "flex");
            $(".crd_wrp").hide();
            const prxMod = document.getElementById("prx_mod");
            prxMod.setAttribute("open", true);
            resolve("Opened");
        }, 100);
    });
}

async function closeModal() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const prxMod = document.getElementById("prx_mod");
            $("#prx_mod").hide();
            $(".crd_wrp").show();
            $(".auth-select-wrap").hide();
            $(".webhook-online-trigger-wrap").hide();
            prxMod.setAttribute("open", false);
            resolve("Closed");
        }, 100);
    });
}

// Nav open/close
async function navStart() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const navSb = document.getElementById("nav_sb");
            navSb.setAttribute("open", true);
            resolve("Set open: true.");
        }, 100);
    });
}

async function openNav() {
    await show_skel_mod();
    return new Promise((resolve) => {
        setTimeout(() => {
            //$("#prx_mod").css("display", "flex");
            // $(".crd_wrp").hide();
            const navSb = document.getElementById("nav_sb");
            navSb.setAttribute("open", true);
            resolve("Opened");
        }, 100);
    });
}

// Modal TimeAgo

function modal_time_ago() {
    return new Promise((resolve) => {
        setTimeout(() => {
            var ipchange_locale = function (number, index, totalSec) {
                // number: the time ago / time in number;
                // index: the index of array below;
                // totalSec: total seconds between date to be formatted and today's date;

                if (totalSec > 60) {
                    var ipChangeColor = "grey";
                } else {
                    var ipChangeColor = "orange";
                }

                return [
                    ["just now", "right now"],
                    ["%s seconds ago", "in %s seconds"],
                    ["1 minute ago", "in 1 minute"],
                    ["%s minutes ago", "in %s minutes"],
                    ["1 hour ago", "in 1 hour"],
                    ["%s hours ago", "in %s hours"],
                    ["1 day ago", "in 1 day"],
                    ["%s days ago", "in %s days"],
                    ["1 week ago", "in 1 week"],
                    ["%s weeks ago", "in %s weeks"],
                    ["1 month ago", "in 1 month"],
                    ["%s months ago", "in %s months"],
                    ["1 year ago", "in 1 year"],
                    ["%s years ago", "in %s years"],
                ][index];
            };

            var reboot_locale = function (number, index, totalSec) {
                // number: the time ago / time in number;
                // index: the index of array below;
                // totalSec: total seconds between date to be formatted and today's date;

                if (totalSec > 60) {
                    var ipChangeColor = "grey";
                } else {
                    var ipChangeColor = "orange";
                }

                return [
                    ["just now", "right now"],
                    ["%s seconds ago", "in %s seconds"],
                    ["1 minute ago", "in 1 minute"],
                    ["%s minutes ago", "in %s minutes"],
                    ["1 hour ago", "in 1 hour"],
                    ["%s hours ago", "in %s hours"],
                    ["1 day ago", "in 1 day"],
                    ["%s days ago", "in %s days"],
                    ["1 week ago", "in 1 week"],
                    ["%s weeks ago", "in %s weeks"],
                    ["1 month ago", "in 1 month"],
                    ["%s months ago", "in %s months"],
                    ["1 year ago", "in 1 year"],
                    ["%s years ago", "in %s years"],
                ][index];
            };

            timeago.register("en_US", ipchange_locale);
            timeago.render(document.getElementById("cp-lastReset"));
            timeago.register("en_US", reboot_locale);
            timeago.render(document.getElementById("cp-lastReboot"));

            resolve("Set time ago...");
        }, 100);
    });
}

// Page TimeAgo

async function getTimeAgoManual() {
    return new Promise((resolve) => {
        setTimeout(() => {
            var ipchange_locale = function (number, index, totalSec) {
                // number: the time ago / time in number;
                // index: the index of array below;
                // totalSec: total secs between date to be formatted and today's date;

                if (totalSec > 60) {
                    var ipChangeColor = "grey";
                } else {
                    var ipChangeColor = "orange";
                }

                return [
                    ["ip changed just now", "ip changing right now"],
                    ["ip changed %s secs ago", "in %s secs"],
                    ["ip changed 1 min ago", "in 1 min"],
                    ["ip changed %s mins ago", "in %s mins"],
                    ["ip changed 1 hr ago", "in 1 hr"],
                    ["ip changed %s hrs ago", "in %s hrs"],
                    ["ip changed 1 day ago", "in 1 day"],
                    ["ip changed %s days ago", "in %s days"],
                    ["ip changed 1 wk ago", "in 1 wk"],
                    ["ip changed %s wks ago", "in %s wks"],
                    ["ip changed 1 mo ago", "in 1 mo"],
                    ["ip changed %s mos ago", "in %s mos"],
                    ["ip changed 1 yr ago", "in 1 yr"],
                    ["ip changed %s yrs ago", "in %s yrs"],
                ][index];
            };

            timeago.register("en_US", ipchange_locale);
            timeago.render(document.querySelectorAll(".last_ip_change"));

            resolve("Set time ago...");
        }, 200);
    });
}


async function getTimeAgoReboot() {
    return new Promise((resolve) => {
        setTimeout(() => {
            var reboot_locale = function (number, index, totalSec) {
                // number: the time ago / time in number;
                // index: the index of array below;
                // totalSec: total secs between date to be formatted and today's date;

                if (totalSec > 60) {
                    var ipChangeColor = "grey";
                } else {
                    var ipChangeColor = "orange";
                }

                return [
                    ["rebooted just now", "rebooting right now"],
                    ["rebooted %s secs ago", "in %s secs"],
                    ["rebooted 1 min ago", "in 1 min"],
                    ["rebooted %s mins ago", "in %s mins"],
                    ["rebooted 1 hr ago", "in 1 hr"],
                    ["rebooted %s hrs ago", "in %s hrs"],
                    ["rebooted 1 day ago", "in 1 day"],
                    ["rebooted %s days ago", "in %s days"],
                    ["rebooted 1 wk ago", "in 1 wk"],
                    ["rebooted %s wks ago", "in %s wks"],
                    ["rebooted 1 mo ago", "in 1 mo"],
                    ["rebooted %s mos ago", "in %s mos"],
                    ["rebooted 1 yr ago", "in 1 yr"],
                    ["rebooted %s yrs ago", "in %s yrs"],
                ][index];
            };

            timeago.register("en_US", reboot_locale);
            timeago.render(document.querySelectorAll(".last_reboot"));

            resolve("Set time ago...");
        }, 200);
    });
}

async function getTimeAgoAuto() {
    return new Promise((resolve) => {
        setTimeout(() => {
            var auto_locale = function (number, index, totalSec) {
                // number: the time ago / time in number;
                // index: the index of array below;
                // totalSec: total secs between date to be formatted and today's date;

                if (totalSec > 60) {
                    var ipChangeColor = "grey";
                } else {
                    var ipChangeColor = "orange";
                }

                return [
                    ["auto changed ip just now", "auto-changing ip right now"],
                    ["auto changed ip %s secs ago", "auto-changing ip in %s sec"],
                    ["auto changed ip 1 min ago", "auto-changing ip in 1 min"],
                    ["auto changed ip %s mins ago", "auto-changing ip in %s min"],
                    ["auto changed ip 1 hrs ago", "auto-changing ip in 1 hrs"],
                    ["auto changed ip %s hrs ago", "auto-changing ip in %s hrs"],
                    ["auto changed ip 1 day ago", "auto-changing ip in 1 day"],
                    ["auto changed ip %s days ago", "auto-changing ip in %s days"],
                    ["auto changed ip 1 wk ago", "auto-changing ip in 1 wk"],
                    ["auto changed ip %s wks ago", "auto-changing ip in %s wks"],
                    ["auto changed ip 1 mos ago", "auto-changing ip in 1 mos"],
                    ["auto changed ip %s mos ago", "auto-changing ip in %s mos"],
                    ["auto changed ip 1 yr ago", "auto-changing ip in 1 yr"],
                    ["auto changed ip %s yrs ago", "auto-changing ip in %s yrs"],
                ][index];
            };

            timeago.register("en_US", auto_locale);
            timeago.render(document.querySelectorAll(".auto_change_on"));

            resolve("Set time ago...");
        }, 200);
    });
}

// Hide skeletons

async function hide_skel_dash() {
    return new Promise((resolve) => {
        setTimeout(() => {
            $(".crd_wrp").show();
            $(".skel_cnt_active").hide();
            $(".crd_skel_wrp").hide();
            resolve("Hid card skeletons");
        }, 100);
    });
}


async function hide_skel_mod() {
    return new Promise((resolve) => {
        setTimeout(() => {
            document.querySelectorAll(".skel_mod").forEach(function (el) {
                el.style.display = "none";
            });
            document.querySelectorAll(".skel_light").forEach(function (el) {
                el.style.display = "none";
            });
            resolve("Hid mod skeletons");
        }, 100);
    });
}

async function show_skel_mod() {
    return new Promise((resolve) => {
        setTimeout(() => {
            document.querySelectorAll(".skel_mod").forEach(function (el) {
                el.style.display = "block";
            });
            document.querySelectorAll(".skel_light").forEach(function (el) {
                el.style.display = "block";
            });
            resolve("Unhid mod skeletons");
        }, 100);
    });
}

// Animations

function iniIx2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            $(document).ready(function () {
                window.Webflow && window.Webflow.require("ix2").init();
                document.dispatchEvent(new CustomEvent("IX2_PREVIEW_LOAD"));
            });
            resolve();
        }, 500);
    });
}


//* Actions

// Change IP modal

$("#change_ip_mod").click(function () {
    change_ip();
});

async function change_ip() {

    var currentProxy = localStorage.getItem('currentProxy');
    var { data: { user } } = await supabaseClient.auth.getUser();

    let { data, error } = await supabaseClient.rpc("dash_func_change_ip_v3", {
        name_input: currentProxy,
        change_ip_input: true,
        // email_input: user.email,
        origin_input: "dashboard"
    });

    if (error) console.error(error);
    else console.log(data);
}


// Reboot proxy modal

$("#reboot_mod").click(function () {
    reboot_device();
});

async function reboot_device() {

    var currentProxy = localStorage.getItem('currentProxy');
    var { data: { user } } = await supabaseClient.auth.getUser();

    let { data, error } = await supabaseClient.rpc("dash_func_reboot_v1", {
        name_input: currentProxy,
        reboot_input: true,
        email_input: user.email,
        origin_input: "dashboard"
    });

    if (error) console.error(error);
    else console.log(data);
}


//* Page load async

async function pageInit() {
    await lscSupaClient();
    await loadClerk();
}

// Clerk resolved async

async function clerkResolved() {

    // Authenticate request
    const supabaseClient = await supaClient();

    // Load actions
    await lscClerkActions();

    // Get Proxies
    await lscGetProxies();
    await clerkActions(supabaseClient, "user_get_proxies");

    // Load realtime
    await lscRpcProxy();

    // Load timeago
    await lscTimeAgo();
    // await getTimeAgoManual();
    // await getTimeAgoReboot();
    // await getTimeAgoAuto();

    await navStart();
    await modalStart();
    await iniIx2();
    await hide_skel_dash();
    // await pageLoader();
}


pageInit();