// v1.3.0

//* Load Clerk
async function loadClerk() {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Get this URL from the Clerk Dashboard
            const frontendApi = "clerk.a7i81.ec7ck.lcl.dev";
            const version = "@latest"; // Set to appropriate version

            // Creates asyncronous script
            const script = document.createElement("script");
            script.setAttribute("data-clerk-frontend-api", frontendApi);
            script.async = true;
            script.src = `https://${frontendApi}/npm/@clerk/clerk-js${version}/dist/clerk.browser.js`;
            document.body.appendChild(script);
            console.log('Clerk loaded 🔒');
            resolve();
        }, 100);
    });
}


//* Loads a JavaScript file and returns a Promise for when it is loaded

const lsc = (src) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.onload = resolve;
            script.onerror = reject;
            script.src = src;
            document.body.append(script);
            resolve();
        }, 100);
    });
};


async function lscSupaToken() {
    return new Promise((resolve) => {
        setTimeout(() => {
            lsc("https://supa.illusory.io/storage/v1/object/public/js/supa/supaToken.js")
                .then(() => console.log("Supa Token js loaded"))
                .catch((err) => console.error(err.message));
            resolve();
        }, 100);
    });
}

async function lscSupaClerk() {
    return new Promise((resolve) => {
        setTimeout(() => {
            lsc("https://supa.illusory.io/storage/v1/object/public/js/supa/supaClerk.js")
                .then(() => console.log("Supa Clerk js loaded"))
                .catch((err) => console.error(err.message));
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
        setTimeout(() => {
            lsc("https://cdnjs.cloudflare.com/ajax/libs/timeago.js/4.0.2/timeago.full.min.js")
                .then(() => console.log("Get Time Ago js loaded"))
                .catch((err) => console.error(err.message));
            resolve();
        }, 100);
    });
}

async function rpcProxy() {
    return new Promise((resolve) => {
        setTimeout(() => {
            lsc("https://supa.illusory.io/storage/v1/object/public/js/proxies/rpcProxy.js")
                .then(() => console.log("Get RPC Proxy js loaded"))
                .catch((err) => console.error(err.message));
            resolve();
        }, 100);
    });
}

async function pageInit() {
    await lscSupaToken();
    const supabaseClient = await lscSupaClerk();
    await loadClerk();
    await lscGetProxies();
    await lscTimeAgo();
    // await getTimeAgoManual();
    // await getTimeAgoReboot();
    // await getTimeAgoAuto();
    await navStart();
    await modalStart();
    await iniIx2();
    await hide_skel_dash();
    await rpcProxy(supabaseClient);
    //   await pageLoader();
}

pageInit();