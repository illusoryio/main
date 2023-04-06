/*
dashboard.js (c) 2023
Desc: Dashboard scripts
Created:  2023-03-31T16:10:05.904Z
Modified: 2023-04-06T21:47:28.378Z
Version: 1.1.8
*/


/**=======================================================================================================================
 * 
 * * /// [Load Clerk v1.0.0]
 * ? Loads ClerkJS and returns a promise
 * 
 *=======================================================================================================================**/


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


/**=======================================================================================================================
 * 
 * * /// [Load Scripts v1.0.0]
 * ? Loads scripts in order
 * 
 *=======================================================================================================================**/


// Loads a JavaScript file and returns a Promise for when it is loaded

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



//* Scripts to load

// TimeAgo External Script

async function lscTimeAgo() {
    await lsc("https://cdnjs.cloudflare.com/ajax/libs/timeago.js/4.0.2/timeago.full.min.js",
        "timeago.full.min.js"
    )
        .then((val) => console.log(val))
        .catch((err) => console.error(err.message));

}


/**=======================================================================================================================
 * 
 * *  /// [Load SupaClient v2.0.0]
 * ? Autheticates Clerk with Supabase and returns a Supabase client
 * 
 *=======================================================================================================================**/



async function supaToken() {
    let token = "";
    try {
        token = await window.Clerk.local.getToken({
            template: "supabase-auth",
        });
        console.log("supaToken", token);
    } catch (e) {
        token = "Invalid token";
        console.error(e);
    }
    return token;
}

async function supaClerk(token) {
    let client;
    let anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cWxvYndqd2Jib3VzZ2Rod3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY1ODk4ODYsImV4cCI6MTk5MjE2NTg4Nn0.nla93WMcf1pNyFXZ5_1sniMD97CYj8y9lF5zKif2TrI'
    try {
        const { createClient } = supabase;
        client = await createClient(
            "https://supa.illusory.io",
            anon,
            {
                global: {
                    headers: { Authorization: `Bearer ${token}` },
                },
                realtime: {
                    headers: {
                        apikey: token,
                    },
                    params: {
                        apikey: anon,
                    },
                },
            }
        );
        client.realtime.setAuth(token)
        console.log(client)
    } catch (e) {
        client = "Invalid Supabase Client";
        console.error(e);
    }
    return client;
}

async function supaClient() {
    const token = await supaToken()
    const client = await supaClerk(token)
    return client;
}


/**=======================================================================================================================
 * 
 * *  /// [Get Proxies v1.0.0]
 * ? Gets proxies from Supabase and displays them on the page
 * 
 *=======================================================================================================================**/




async function getProxies(supabaseClient) {
    if (!supabaseClient) {
        var supabaseClient = await supaClient();
        console.log("supabaseClient New", supabaseClient);
    } else {
        var supabaseClient = supabaseClient;
        console.log("supabaseClient", supabaseClient);
    }
    const { data, error } = await supabaseClient
        .from("proxies_restricted")
        .select()
        .order("proxy_name", { ascending: true });
    return new Promise((resolve) => {
        setTimeout(() => {
            if (error) {
                console.error("we got an error:", error);
            } else {
                // Clear content
                const prxCard = document.getElementsByClassName("cards-v2")[0];
                prxCard.innerHTML = "";

                var items = data;
                var isp_count = 0;

                for (var i = 0; i < items.length; i++) {
                    // Proxies array
                    var item = items[i];

                    // Create card
                    const card = document.createElement("div");
                    card.setAttribute("prx_card", item.proxy_name);
                    card.classList.add("prx_crd_v2");
                    card.setAttribute("onclick", "interact(this)");
                    card.setAttribute("interact", item.proxy_name);
                    prxCard.appendChild(card);

                    // Create card top
                    const prxCardTop = document.createElement("div");
                    prxCardTop.classList.add("prx_crd_top");
                    card.appendChild(prxCardTop);

                    // Add timer div
                    const cardTimerElem = document.createElement("div");
                    cardTimerElem.classList.add("prx_crd_ti_v2");
                    cardTimerElem.setAttribute("prx_res_timer", item.proxy_name);
                    prxCardTop.appendChild(cardTimerElem);

                    // Add proxy card title section
                    const cardTitleWrap = document.createElement("div");
                    cardTitleWrap.classList.add("prx_crd_tit_sec_v2");
                    cardTitleWrap.classList.add("w-clearfix");
                    prxCardTop.appendChild(cardTitleWrap);

                    // Add proxy rotate icon wrap
                    const cardIcons = document.createElement("div");
                    cardIcons.classList.add("ico_rot_v2");
                    cardIcons.classList.add("w-embed");
                    cardTitleWrap.appendChild(cardIcons);

                    // Add proxy rotate icon
                    const rotateImgElem = new Image();
                    rotateImgElem.src =
                        "https://assets.website-files.com/601983fb7d31a9e2fe9f0840/61aa903bc84f5b905f432b4f_rotate-cw.svg";
                    rotateImgElem.setAttribute("onclick", "resetProxy(this.id)");
                    rotateImgElem.setAttribute("id", "reset_" + item.proxy_name);
                    cardIcons.appendChild(rotateImgElem);

                    // Add proxy card title wrap
                    const cardDetailsElem = document.createElement("div");
                    cardDetailsElem.classList.add("prx_crd_det_v2");
                    cardTitleWrap.appendChild(cardDetailsElem);

                    // Add proxy card title
                    const cardTitleText = document.createElement("div");
                    cardTitleText.classList.add("crd_tit_v2");
                    cardTitleText.classList.add("smaller");
                    cardTitleText.innerHTML = item.proxy_name;
                    cardTitleText.setAttribute("crd_tit", item.proxy_name);
                    cardTitleWrap.appendChild(cardTitleText);

                    // Add proxy card subtitle
                    const cardSubTitle = document.createElement("div");
                    cardSubTitle.classList.add("prx_subtxt_v2");
                    cardSubTitle.setAttribute("crd_ports", item.proxy_name);
                    cardSubTitle.classList.add("smaller");
                    cardSubTitle.innerHTML =
                        "HTTP " + item.h_port + " • " + "SOCKS5 " + item.s_port;
                    cardTitleWrap.appendChild(cardSubTitle);

                    // Add proxy indicator wrap
                    const indicatorWrap = document.createElement("div");
                    indicatorWrap.classList.add("ind_wrp_v2");
                    indicatorWrap.classList.add("w-clearfix");
                    prxCardTop.appendChild(indicatorWrap);

                    if (item.isp == "AT&T") {
                        var ispColor = "blue";
                    } else {
                        if (item.isp == "Verizon") {
                            var ispColor = "red";
                        } else {
                            if (item.isp == "T-Mobile") {
                                var ispColor = "pink";
                            }
                        }
                    }

                    // Add proxy card isp indicator
                    const ispTitle = document.createElement("div");
                    ispTitle.classList.add("ind_v3");
                    ispTitle.classList.add(ispColor);
                    ispTitle.innerHTML = item.isp;
                    ispTitle.setAttribute("crd_isp", item.proxy_name);
                    indicatorWrap.appendChild(ispTitle);

                    // Add proxy card location indicator
                    const locTitle = document.createElement("div");
                    locTitle.classList.add("ind_v3");
                    locTitle.classList.add("purple");
                    locTitle.innerHTML = item.location;
                    locTitle.setAttribute("crd_loc", item.proxy_name);
                    indicatorWrap.appendChild(locTitle);

                    // Add proxy card threads indicator
                    const threadsTitle = document.createElement("div");
                    threadsTitle.classList.add("ind_v3");
                    threadsTitle.classList.add("light-blue");
                    threadsTitle.innerHTML =
                        parseInt(item.h_threads) + parseInt(item.s_threads) + " threads";
                    threadsTitle.setAttribute("crd_threads", item.proxy_name);
                    indicatorWrap.appendChild(threadsTitle);

                    if (item.traffic < 1024) {
                        var suffix = "Bytes";
                        var divider = 1;
                    } else {
                        if (item.traffic >= 1024 && item.traffic < 1048576) {
                            var suffix = "KB";
                            var divider = 1024;
                        } else {
                            if (item.traffic >= 1048576 && item.traffic < 1073741824) {
                                var suffix = "MB";
                                var divider = 1048576;
                            } else {
                                if (
                                    item.traffic >= 1073741824 &&
                                    item.traffic < 1099511627776
                                ) {
                                    var suffix = "GB";
                                    var divider = 1073741824;
                                } else {
                                    if (item.traffic >= 1099511627776) {
                                        var suffix = "TB";
                                        var divider = 1099511627776;
                                    }
                                }
                            }
                        }
                    }

                    if (item.traffic < 1024) {
                        var divided = parseInt(item.traffic) / parseInt(divider);
                        var converted = divided + " " + suffix;
                    } else {
                        var divided = parseInt(item.traffic) / parseInt(divider);
                        var converted = divided.toFixed(2) + " " + suffix;
                    }

                    // Add proxy card traffic indicator
                    const trafficTitle = document.createElement("div");
                    trafficTitle.classList.add("ind_v3");
                    trafficTitle.classList.add("light-blue");
                    trafficTitle.innerHTML = converted;
                    trafficTitle.setAttribute("crd_traffic", item.proxy_name);
                    indicatorWrap.appendChild(trafficTitle);

                    // Add proxy card auto-change indicator
                    var autoChange = item.auto_change;
                    if (autoChange == true) {
                        var autoChangeColor = "green";
                        var autoChangeText = "auto-change updating"; //item.next_ip_change;
                        var autoChangeTarget = "auto_change_on";
                    } else {
                        var autoChangeColor = "grey";
                        var autoChangeText = "auto-change off";
                        var autoChangeTarget = "auto_change_off";
                    }

                    const autoChangeTitle = document.createElement("div");
                    autoChangeTitle.classList.add("ind_v3");
                    autoChangeTitle.classList.add(autoChangeTarget);
                    autoChangeTitle.classList.add(autoChangeColor);
                    autoChangeTitle.innerHTML = autoChangeText;
                    autoChangeTitle.setAttribute("crd_auto", item.proxy_name);
                    autoChangeTitle.setAttribute("datetime", item.next_ip_change);
                    indicatorWrap.appendChild(autoChangeTitle);

                    const lastIpChange = document.createElement("div");
                    lastIpChange.classList.add("ind_v3");
                    lastIpChange.classList.add("last_ip_change");
                    lastIpChange.setAttribute("datetime", item.last_ip_change);
                    lastIpChange.innerHTML = "ip change updating"; // item.last_ip_change;
                    lastIpChange.setAttribute("crd_last_ip_change", item.proxy_name);
                    indicatorWrap.appendChild(lastIpChange);

                    const lastReboot = document.createElement("div");
                    lastReboot.classList.add("ind_v3");
                    lastReboot.classList.add("last_reboot");
                    lastReboot.setAttribute("datetime", item.last_reboot);
                    lastReboot.innerHTML = "reboot updating"; //item.last_reboot;
                    lastReboot.setAttribute("crd_last_reboot", item.proxy_name);
                    indicatorWrap.appendChild(lastReboot);

                    //   // Create interact
                    //   const prxCardInteract = document.createElement("div");
                    //   prxCardInteract.classList.add("prx_crd_act");
                    //   prxCardInteract.setAttribute("interact", item.proxy_name);
                    //   prxCardInteract.setAttribute("onclick", "interact(this)");
                    //   prxCardInteract.innerHTML = "Interact";
                    //   card.appendChild(prxCardInteract);

                    const prxModX = document.getElementById("mod_x");
                    prxModX.setAttribute("onclick", "closeModal(this)");

                    var add_isp_count = parseInt(isp_count) + 1;
                    isp_count = add_isp_count;

                    document.querySelector("#all_isps_cnt").innerHTML = isp_count;
                }
            }
            resolve();
        }, 200);
    });
}




/**=======================================================================================================================
 *  
 *  
 * * /// [Resize Dashboard v1.0.0]
 * ? Resizes cards and modal to fit screen size
 *  
 *  
 *=======================================================================================================================**/



$("#cea_mod, #cea_nav").click(function (e) {
    $(document).ready(function () {
        // $(".crds_col").css({
        //   width: "auto",
        // });

        var clicked = document.getElementById(e.target.id);
        var prxMod = document.getElementById("prx_mod");
        var navSb = document.getElementById("nav_sb");

        var modOpen = prxMod.getAttribute("open");
        var navOpen = navSb.getAttribute("open");

        if (clicked.id == "cea_mod") {
            console.log(clicked.id);
            if (modOpen == "true") {
                var modOpenNew = "false";
                prxMod.setAttribute("open", modOpenNew);
            } else {
                var modOpenNew = "true";
                prxMod.setAttribute("open", modOpenNew);
            }
        } else {
            if (modOpen == "true") {
                var modOpenNew = "true";
            } else {
                var modOpenNew = "false";
            }
        }

        if (clicked.id == "cea_nav") {
            if (navOpen == "true") {
                var navOpenNew = "false";
                navSb.setAttribute("open", navOpenNew);
            } else {
                var navOpenNew = "true";
                navSb.setAttribute("open", navOpenNew);
            }
        } else {
            if (navOpen == "true") {
                var navOpenNew = "true";
            } else {
                var navOpenNew = "false";
            }
        }

        //current sizing

        if (navOpenNew == "true" && modOpenNew == "false") {
            if ($(window).width() >= 1800) {
                $(".cards-v2").css({
                    "grid-template-columns": "1fr 1fr 1fr 1fr",
                });
                $(".crds_col").css({
                    width: "89%",
                });
                $(".ind_wrp_v2").css({
                    "margin-right": "3rem",
                });
            }
            if ($(window).width() <= 1799 && $(window).width() > 1600) {
                $(".cards-v2").css({
                    "grid-template-columns": "1fr 1fr 1fr",
                });
                $(".crds_col").css({
                    width: "87%",
                });
                $(".ind_wrp_v2").css({
                    "margin-right": "3rem",
                });
            }

            if ($(window).width() <= 1599 && $(window).width() > 1451) {
                $(".cards-v2").css({
                    "grid-template-columns": "1fr 1fr 1fr",
                });
                $(".crds_col").css({
                    width: "85%",
                });
                $(".ind_wrp_v2").css({
                    "margin-right": "3rem",
                });
            }

            if ($(window).width() <= 1450 && $(window).width() > 1281) {
                $(".cards-v2").css({
                    "grid-template-columns": "1fr 1fr",
                });
                $(".crds_col").css({
                    width: "84%",
                });
                $(".ind_wrp_v2").css({
                    "margin-right": "3rem",
                });
            }

            if ($(window).width() <= 1280 && $(window).width() > 1081) {
                $(".cards-v2").css({
                    "grid-template-columns": "1fr 1fr",
                });

                $(".crds_col").css({
                    width: "81%",
                });

                $(".ind_wrp_v2").css({
                    "margin-right": "0",
                });
            }

            if ($(window).width() <= 1080 && $(window).width() > 881) {
                $(".cards-v2").css({
                    "grid-template-columns": "1fr 1fr",
                });

                $(".crds_col").css({
                    width: "77%",
                });

                $(".ind_wrp_v2").css({
                    "margin-right": "0",
                });
            }

            if ($(window).width() <= 880 && $(window).width() > 680) {
                $(".cards-v2").css({
                    "grid-template-columns": "1fr",
                });

                $(".crds_col").css({
                    width: "70%",
                });

                $(".ind_wrp_v2").css({
                    "margin-right": "0",
                });
            }
        }

        // resize

        $(window).resize(function () {
            if (navOpenNew == "true" && modOpenNew == "false") {
                if ($(window).width() >= 1800) {
                    $(".cards-v2").css({
                        "grid-template-columns": "1fr 1fr 1fr 1fr",
                    });
                    $(".crds_col").css({
                        width: "89%",
                    });
                    $(".ind_wrp_v2").css({
                        "margin-right": "3rem",
                    });
                }
                if ($(window).width() <= 1799 && $(window).width() > 1600) {
                    $(".cards-v2").css({
                        "grid-template-columns": "1fr 1fr 1fr",
                    });
                    $(".crds_col").css({
                        width: "87%",
                    });
                    $(".ind_wrp_v2").css({
                        "margin-right": "3rem",
                    });
                }

                if ($(window).width() <= 1599 && $(window).width() > 1451) {
                    $(".cards-v2").css({
                        "grid-template-columns": "1fr 1fr 1fr",
                    });
                    $(".crds_col").css({
                        width: "85%",
                    });
                    $(".ind_wrp_v2").css({
                        "margin-right": "3rem",
                    });
                }

                if ($(window).width() <= 1450 && $(window).width() > 1281) {
                    $(".cards-v2").css({
                        "grid-template-columns": "1fr 1fr",
                    });
                    $(".crds_col").css({
                        width: "84%",
                    });
                    $(".ind_wrp_v2").css({
                        "margin-right": "3rem",
                    });
                }

                if ($(window).width() <= 1280 && $(window).width() > 1081) {
                    $(".cards-v2").css({
                        "grid-template-columns": "1fr 1fr",
                    });

                    $(".crds_col").css({
                        width: "81%",
                    });

                    $(".ind_wrp_v2").css({
                        "margin-right": "0",
                    });
                }

                if ($(window).width() <= 1080 && $(window).width() > 881) {
                    $(".cards-v2").css({
                        "grid-template-columns": "1fr 1fr",
                    });

                    $(".crds_col").css({
                        width: "77%",
                    });

                    $(".ind_wrp_v2").css({
                        "margin-right": "0",
                    });
                }

                if ($(window).width() <= 880 && $(window).width() > 680) {
                    $(".cards-v2").css({
                        "grid-template-columns": "1fr",
                    });

                    $(".crds_col").css({
                        width: "70%",
                    });

                    $(".ind_wrp_v2").css({
                        "margin-right": "0",
                    });
                }
            }
        });
    });
});



/**=======================================================================================================================
 *  
 *  
 * * /// [Load RPC v2.1.1]
 * ? This function is used to load the RPC data from the database and display it on the page.
 *  
 *  
 *=======================================================================================================================**/



async function rpcProxy(supabaseClient) {
    if (!supabaseClient) {
        var supabaseClient = await supaClient();
        // console.log("supabaseClient: ", supabaseClient)
    } else {
        var supabaseClient = supabaseClient;
        //  console.log("supabaseClient: ", supabaseClient);
    }
    await supabaseClient.channel('proxies_restricted')
        .on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'proxies_restricted' },
            (payload) => {
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
                    $("#cp-traffic").html(converted);
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
        .subscribe(status => {
            if (status === "SUBSCRIBED") {
                console.log("Subscribed to proxy events")
            }
        })
}


/**=======================================================================================================================
 *  
 *  
 * * /// [RPC Refresh v2.0.1]
 * ? This function is used to refresh the RPC.
 *  
 *  
 *=======================================================================================================================**/

const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

async function rpcProxyRefresh() {
    var rpcProxyRunningTimestamp = localStorage.getItem("rpcProxyRunning");

    if (rpcProxyRunningTimestamp && (Date.now() - rpcProxyRunningTimestamp < 50000)) {
        // Return if it has been less than 50 seconds since rpcProxyRunning was set
        console.log('RPC Proxy Refresh is already running');
        return;
    } else {
        var rpcProxyRunningTimestamp = Date.now();
        localStorage.setItem("rpcProxyRunning", rpcProxyRunningTimestamp);
        async function runRpcProxy() {
            await sleep(1000);
            var rpcProxyInterval = localStorage.getItem("rpcProxyInterval");

            if (!rpcProxyInterval) {
                var rpcProxyIntervalNew = 0 + 1;
                // console.log(rpcProxyIntervalNew);
                localStorage.setItem("rpcProxyInterval", rpcProxyIntervalNew);
                runRpcProxy();
            } else {
                if (rpcProxyInterval < 50) {
                    var rpcProxyIntervalNew = parseInt(rpcProxyInterval) + 1;
                    // console.log(rpcProxyIntervalNew);
                    localStorage.setItem("rpcProxyInterval", rpcProxyIntervalNew);

                    // Check if the current tab is visible
                    if (document.visibilityState === 'visible') {
                        runRpcProxy();
                    } else {
                        console.log('Tab is not visible');
                        // Pause the loop if the tab is hidden
                        document.addEventListener('visibilitychange', function listener() {
                            if (document.visibilityState === 'visible') {
                                document.removeEventListener('visibilitychange', listener);
                                console.log('Tab is visible again');
                                localStorage.setItem("rpcProxyInterval", 1);
                                rpcProxyRefresh();
                            }
                        });
                    }
                } else {
                    console.log('Refreshing RPC Proxy');
                    await rpcProxy();
                    localStorage.removeItem("rpcProxyInterval");
                    localStorage.removeItem("rpcProxyRunning");
                    rpcProxyRefresh();
                }
            }
        }
        await runRpcProxy();
    }
}


/**=======================================================================================================================
 *  
 *  
 * * /// [Time Ago Config v1.0.0]
 * ? This function is used to configure the time ago function.
 *  
 *  
 *=======================================================================================================================**/


//* Modal TimeAgo

function modal_time_ago() {
    return new Promise((resolve) => {
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
        setTimeout(() => {
            resolve("Set time ago...");
        }, 100);
    });
}

//* Page TimeAgo
// Change IP TimeAgo

async function getTimeAgoManual() {
    return new Promise((resolve) => {
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
        setTimeout(() => {
            resolve("Set time ago...");
        }, 200);
    });
}

// Reboot TimeAgo

async function getTimeAgoReboot() {
    return new Promise((resolve) => {
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
        setTimeout(() => {
            resolve("Set time ago...");
        }, 200);
    });
}


// Auto Refresh TimeAgo

async function getTimeAgoAuto() {
    return new Promise((resolve) => {
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

        // Check if there is any auto change on

        const on = document.querySelectorAll(".auto_change_on");
        if (on.length > 0) {
            timeago.register("en_US", auto_locale);
            timeago.render(document.querySelectorAll(".auto_change_on"));
        } else {
            console.log("No auto change on");
        }

        setTimeout(() => {
            resolve("Set time ago...");
        }, 200);
    });
}





/**=======================================================================================================================
 *  
 *  
 * * /// [Modal Details v1.0.0]
 * ? This function is used to interact with the modal and display the proxy information.
 *  
 *  
 *=======================================================================================================================**/



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
    const supabaseClient = await supaClient();
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


/**=======================================================================================================================
 *  
 *  
 * * /// [Modal Open_Close v1.0.0]
 *  
 *  
 *=======================================================================================================================**/


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


/**=======================================================================================================================
 *  
 *  
 * * /// [Nav Open_Close v1.0.0]
 *  
 *  
 *=======================================================================================================================**/


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


/**=======================================================================================================================
 *  
 *  
 * * /// [Plus Minus Fields v1.0.0]
 * ? Function to add/subtract 1 from a number input field.
 *  
 *  
 *=======================================================================================================================**/


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





/**=======================================================================================================================
 *  
 *  
 * * /// [Skeletons v1.0.0]
 * ? Functions to hide/show skeletons.
 *  
 *  
 *=======================================================================================================================**/



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


/**=======================================================================================================================
 *  
 *  
 * * /// [Animations v1.0.0]
 * ? Functions to load animations.
 *  
 *  
 *=======================================================================================================================**/

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


/**=======================================================================================================================
 * 
 * *  /// [Clerk Actions v1.0.0]
 * ? Handles ClerkJS actions
 * 
 *=======================================================================================================================**/



async function clerkActions(supabaseClient, action) {
    // Get Proxies
    if (action == "user_get_proxies") {
        await getProxies(supabaseClient);
    }
}




/**=======================================================================================================================
 *  
 *  
 * * /// [Proxy Actions (Legacy) v1.0.0]
 * ? Functions to perform actions.
 *  
 *  
 *=======================================================================================================================**/



//* Change IP modal

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


//* Reboot proxy modal

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


/**=======================================================================================================================
 *  
 *  
 * * /// [Clear local Items v1.0.0]
 * ? Clears local items on page load.
 *  
 *  
 *=======================================================================================================================**/


// Clear local items
async function clearLocalItems() {
    return new Promise((resolve) => {
        localStorage.removeItem("rpcProxyInterval");
        localStorage.removeItem("rpcProxyRunning");
        setTimeout(() => {
            resolve("Cleared local items");
        }, 100);
    });
}



/**=======================================================================================================================
 *  
 *  
 * * /// [Page Load v1.0.0]
 * ? Functions to load page.
 *  
 *  
 *=======================================================================================================================**/


// Page load async

async function pageInit() {
    // await lscSupaClient();
    await clearLocalItems();
    await loadClerk();
}


/**=======================================================================================================================
 *  
 *  
 * * /// [Clerk Resolved v1.0.0]
 * ? What to do when Clerk is resolved.
 *  
 *  
 *=======================================================================================================================**/

// Clerk resolved async

async function clerkResolved() {

    // Authenticate request
    const supabaseClient = await supaClient();

    // Get Proxies
    await clerkActions(supabaseClient, "user_get_proxies");

    // Load realtime
    await rpcProxy(supabaseClient);
    await rpcProxyRefresh();

    // Load timeago
    await lscTimeAgo();
    await getTimeAgoManual();
    await getTimeAgoReboot();
    await getTimeAgoAuto();

    await navStart();
    await modalStart();
    await iniIx2();
    await hide_skel_dash();
    // await pageLoader();
}


pageInit();