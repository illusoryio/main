/*
clerkActions.js (c) 2023
Desc: Clerk Actions controller
Created:  2023-04-01T13:15:50.357Z
Modified: 2023-04-01T13:57:06.372Z
*/

async function clerkActions(supabaseClient, action) {
  // Get Proxies
  if (action == "user_get_proxies") {
    await getProxies(supabaseClient);
  }
}