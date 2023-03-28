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
    resolve();
  });
}