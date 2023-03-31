/*
dashboard.js (c) 2023
Desc: Dashboard scripts
Created:  2023-03-31T16:10:05.904Z
Modified: 2023-03-31T19:06:58.735Z
*/

//* Load Clerk
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

const lsc = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.onload = resolve;
        script.onerror = reject;
        script.src = src;
        script.async = false;
        document.body.append(script);
    });
};


async function lscSupaToken() {
    return new Promise((resolve) => {
        lsc("https://supa.illusory.io/storage/v1/object/public/js/supa/supaToken.js")
            .then(() => console.log("Supa Token js loaded"))
            .catch((err) => console.error(err.message));
        setTimeout(() => {
            resolve();
        }, 100);
    });
}

async function lscSupaClerk() {
    return new Promise((resolve) => {
        lsc("https://supa.illusory.io/storage/v1/object/public/js/supa/supaClerk.js")
            .then(() => console.log("Supa Clerk js loaded"))
            .catch((err) => console.error(err.message));
        setTimeout(() => {
            resolve();
        }, 100);
    });
}

async function lscGetProxies() {
    return new Promise((resolve) => {
        setTimeout(() => {
            lsc("https://supa.illusory.io/storage/v1/object/public/js/proxies/getProxies.js")
                .then(() => console.log("Get Proxies js loaded"))
                .catch((err) => console.error(err.message));
            resolve();
        }, 100);
    });
}

async function lscTimeAgo() {
    return new Promise((resolve) => {
        lsc("https://cdnjs.cloudflare.com/ajax/libs/timeago.js/4.0.2/timeago.full.min.js")
            .then(() => console.log("Get Time Ago js loaded"))
            .catch((err) => console.error(err.message));
        setTimeout(() => {
            resolve();
        }, 100);
    });
}

async function lscClerkActions() {
    return new Promise((resolve) => {
        lsc("https://supa.illusory.io/storage/v1/object/public/js/clerk/clerkActions.js")
            .then(() => console.log("Clerk Actions js loaded"))
            .catch((err) => console.error(err.message));
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

async function lscRpcProxy() {
    return new Promise((resolve) => {
        lsc("https://supa.illusory.io/storage/v1/object/public/js/proxies/rpcProxy.js")
            .then(() => console.log("Get RPC Proxy js loaded"))
            .catch((err) => console.error(err.message));
        setTimeout(() => {
            resolve();
        }, 100);
    });
}


async function pageInit() {
    await lscSupaToken();
    await lscSupaClerk();
    await loadClerk();
}

pageInit();


async function clerkResolved() {
    await lscGetProxies();
    await lscTimeAgo();
    // await getTimeAgoManual();
    // await getTimeAgoReboot();
    // await getTimeAgoAuto();

    await lscClerkActions();
    const action = "user_get_proxies";
    await clerkActions(action);
    await lscRpcProxy(supabaseClient);

    await navStart();
    await modalStart();
    await iniIx2();
    await hide_skel_dash();
    //   await pageLoader();
}