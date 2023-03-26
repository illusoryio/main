/**
 * Loads a JavaScript file and returns a Promise for when it is loaded
 */
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = resolve;
    script.onerror = reject;
    script.src = src;
    document.body.append(script);
  });
};
loadScript("https://supa.illusory.io/storahe/v1/object/public/js/clerk/loadClerk.js")
  .then(() =>
    console.log("Clerk loaded"),
    loadScript("https://supa.illusory.io/storage/v1/object/public/js/proxies/getProxies.js")
      .then(() =>
        console.log("Get Proxies loaded"),
        loadScript(
          "https://supa.illusory.io/storage/v1/object/public/js/supa/supaToken.js"
        )
      )
      .then(() =>
        console.log("Supa Token loaded"),
        loadScript(
          "https://supa.illusory.io/storage/v1/object/public/js/supa/supaClerk.js"
        )
      )
      .then(() =>
        console.log("Supa Clerk loaded")
      )
      .catch(() => console.error("Something went wrong.")))