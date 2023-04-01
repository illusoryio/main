/*
supaClient.js (c) 2023
Desc: Authenticate with Supabase
Created:  2023-04-01T13:15:50.357Z
Modified: 2023-04-01T14:04:40.011Z
*/

async function supaToken() {
    let token;
    try {
        token = await window.Clerk.session.getToken({
            template: "supabase-auth",
        });
        console.log("supaToken", token);
    } catch (e) {
        token = "Invalid token";
        console.error(err);
    }
    return token;
}

async function supaClerk(token) {
    let client;
    try {
        const { createClient } = supabase;
        client = await createClient(
            "https://supa.illusory.io",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cWxvYndqd2Jib3VzZ2Rod3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY1ODk4ODYsImV4cCI6MTk5MjE2NTg4Nn0.nla93WMcf1pNyFXZ5_1sniMD97CYj8y9lF5zKif2TrI",
            {
                global: {
                    headers: { Authorization: `Bearer ${token}` },
                },
            }
        );
        console.log(client)
    } catch (e) {
        client = "Invalid Supabase Client";
        console.error(e);
    }
    return client;
}

async function supaClient() {
    await supaToken()
    const supabaseClient = await supaClerk(token)
    return supabaseClient;
}