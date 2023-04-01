
async function clerkActions(action) {

  // Get Proxies
  if (action == "user_get_proxies") {
    const supcli = await getProxies(supc);
    console.log("Get Proxies", supcli);
  }
}

