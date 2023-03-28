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


function lscSupaToken() {
    lsc("https://supa.illusory.io/storage/v1/object/public/js/supa/supaToken.js")
        .then(() => console.log("Supa Token js loaded"))
        .catch((err) => console.error(err.message));
}

function lscSupaClerk() {
    lsc("https://supa.illusory.io/storage/v1/object/public/js/supa/supaClerk.js")
        .then(() => console.log("Supa Clerk js loaded"))
        .catch((err) => console.error(err.message));
}

function lscGetProxies() {
    lsc("https://supa.illusory.io/storage/v1/object/public/js/proxies/getProxies.js")
        .then(() => console.log("Get Proxies js loaded"))
        .catch((err) => console.error(err.message));
}

function lscLoadClerk() {
    lsc("https://supa.illusory.io/storage/v1/object/public/js/clerk/loadClerk.js")
        .then(() => console.log("Clerk js loaded"))
        .catch((err) => console.error(err.message));
}
