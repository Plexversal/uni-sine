
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { ManagementClient } from 'auth0';

export default withApiAuthRequired(async function handler(req, res) {

    try {
    const session = await getSession(req, res);
    if (!session) {
        res.status(401).end('Unauthorized');
        return;
    }

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

    if(!data) {
        res.status(401).json({message: "Unauthorized"});
        return;
    }

    if(!data.app_metadata.is_admin) {
        res.status(401).json({message: "User does not have suffecient permissions to access this resource"});
        return;
    }
    const userName = req.query.userName || req.body.userName;
    const auth0 = new ManagementClient({
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        scope: 'read:logs',
    });

    let logsResponse = await auth0.getLogs({q: `(type:f* OR type:du OR type:limit*) AND user_name:${userName}`})
    if(!logsResponse) res.status(404).json({message: `no logs found.`})

    res.status(200).json(logsResponse)
    } catch(error) {
        console.log(error)
        res.status(500).json({message: `internal server error`})
    }


});