// v1.1

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
        document.body.appendChild(script);
        console.log('Clerk loaded 🔒');
        resolve();
    });
}

/*
* Loads a JavaScript file and returns a Promise for when it is loaded
*/
const lsc = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.onload = resolve;
        script.onerror = reject;
        script.src = src;
        document.body.append(script);
    });
};


async function lscSupaToken() {
    lsc("https://supa.illusory.io/storage/v1/object/public/js/supa/supaToken.js")
        .then(() => console.log("Supa Token js loaded"))
        .catch((err) => console.error(err.message));
}

async function lscSupaClerk() {
    lsc("https://supa.illusory.io/storage/v1/object/public/js/supa/supaClerk.js")
        .then(() => console.log("Supa Clerk js loaded"))
        .catch((err) => console.error(err.message));
}

async function lscGetProxies() {
    lsc("https://supa.illusory.io/storage/v1/object/public/js/proxies/getProxies.js")
        .then(() => console.log("Get Proxies js loaded"))
        .catch((err) => console.error(err.message));
}

async function lscTimeAgo() {
    lsc("https://cdnjs.cloudflare.com/ajax/libs/timeago.js/4.0.2/timeago.full.min.js")
        .then(() => console.log("Get Time Ago js loaded"))
        .catch((err) => console.error(err.message));
}

async function play() {
    await lscSupaToken();
    await lscSupaClerk();
    await lscGetProxies();
    await lscTimeAgo();
    await loadClerk();
}

play();