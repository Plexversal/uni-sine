import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
export default withApiAuthRequired(async function handler(req, res){
    const session = await getSession(req, res);
    if (!session) {
        // No session found
        res.status(401).end('Unauthorized');
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
        const passData = {
            user_id: session.user.sub,
            ttl_sec: 600,
            result_url: req.headers['x-page-path']
        }
        const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/tickets/password-change`, {
            method: 'POST',
            body: JSON.stringify(passData),
            headers: { "authorization": `Bearer ${token.access_token}`, 'Content-Type': 'application/json' },
        })
        const data = await response.json()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch data' });
    }
});
