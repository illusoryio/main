
async function clerkActions(supabaseClient, action) {
  // Get Proxies
  if (action == "user_get_proxies") {
    await getProxies(supabaseClient);
  }
}