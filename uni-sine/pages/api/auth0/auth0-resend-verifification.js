// uni-sine/pages/api/auth0/resend-verification.js
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const session = await getSession(req, res);
  if (!session) {
    res.status(401).end('Unauthorized');
    return;
  }

  // Get Auth0 Management API token
  const tokenResponse = await fetch('https://uni-sine.eu.auth0.com/oauth/token', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(Auth0Data)
  });
  const token = await tokenResponse.json()

  // Resend verification email
  const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/jobs/verification-email`, {
    method: 'POST',
    headers: { "authorization": `Bearer ${token.access_token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: session.user.sub })
  });

  if (response.ok) {
    res.status(200).json({ message: 'Verification email sent' });
  } else {
    res.status(500).json({ error: 'Unable to send verification email' });
  }
});