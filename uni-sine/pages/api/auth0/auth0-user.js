import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
    const session = await getSession(req, res);
    if (!session) {
        // No session found
        res.status(401).json({error: 'Unauthorized'});
        res.end()
        return;
    }
    try {

        const Auth0Data = {
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: "https://uni-sine.eu.auth0.com/api/v2/",
            grant_type: "client_credentials"
        }
        const tokenResponse = await fetch('https://uni-sine.eu.auth0.com/oauth/token', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(Auth0Data)
        });
        const token = await tokenResponse.json()
        const userResponse = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${session.user.sub}`, {
            method: 'GET',
            headers: { "authorization": `Bearer ${token.access_token}` },
        })
        const data = await userResponse.json()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch data' });
    }
});
