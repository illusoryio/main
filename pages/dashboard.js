/*
dashboard.js (c) 2023
Desc: Dashboard scripts
Created:  2023-03-31T16:10:05.904Z
Modified: 2023-04-01T13:04:14.381Z
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

async function lscSupaToken() {
    await lsc(
        "https://supa.illusory.io/storage/v1/object/public/js/supa/supaToken.js",
        "supaToken.js"
    )
        .then((val) => console.log(val))
        .catch((err) => console.error(err.message));
}


async function lscSupaClerk() {
    await lsc("https://supa.illusory.io/storage/v1/object/public/js/supa/supaClerk.js",
        "supaClerk.js"
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


