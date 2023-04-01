
async function clerkActions(supc, action) {
  // Get Proxies
  if (action == "user_get_proxies") {
    await getProxies(supc);
  }
}