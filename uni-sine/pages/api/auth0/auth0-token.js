
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const session = await getSession(req, res);
  if (!session) {
    // No session found
    res.status(401).end('Unauthorized');
    return;
  }
  const Auth0Data = {
    client_id: process.env.AUTH0_MANAGE_CLIENT_ID,
    client_secret: process.env.AUTH0_MANAGE_SECRET,
    audience: "https://uni-sine.eu.auth0.com/api/v2/",
    grant_type: "client_credentials"
  }

  try {
    const response = await fetch('https://uni-sine.eu.auth0.com/oauth/token', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(Auth0Data)
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch data' });
  }
});