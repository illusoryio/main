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

function sc_loadClerk() {
    lsc("https://supa.illusory.io/storage/v1/object/public/js/clerk/loadClerk.js")
        .then(() => console.log("Clerk loaded"))
        .catch((err) => console.error(err.message));
}

function sc_getProxies() {
    lsc("https://supa.illusory.io/storage/v1/object/public/js/proxies/getProxies.js")
        .then(() => console.log("Get Proxies loaded"))
        .catch((err) => console.error(err.message));
}

function sc_supaToken() {
    lsc("https://supa.illusory.io/storage/v1/object/public/js/supa/supaToken.js")
        .then(() => console.log("Supa Token loaded"))
        .catch((err) => console.error(err.message));
}

function sc_upaClerk() {
    lsc("https://supa.illusory.io/storage/v1/object/public/js/supa/supaClerk.js")
        .then(() => console.log("Supa Clerk loaded"))
        .catch((err) => console.error(err.message));
}