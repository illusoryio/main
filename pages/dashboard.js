/*
dashboard.js (c) 2023
Desc: Dashboard scripts
Created:  2023-03-31T16:10:05.904Z
Modified: 2023-04-01T21:39:38.203Z
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


async function lscResize() {
    await lsc("https://supa.illusory.io/storage/v1/object/public/js/proxies/resize.js",
        "resize.js"
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