async function clerkActions(action) {
  // Authenticate request
  const token = await supaToken();
  console.log("supaToken", token);
  const supc = await supaClerk(token);
  console.log("supaClerk", supc);

  // Get Proxies
  if (action == "user_get_proxies") {
    const supcli = await getProxies(supc);
    console.log("Get Proxies", supcli);
  }
}