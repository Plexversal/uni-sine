import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';


function getBaseUrl(req) {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${protocol}://${host}`;
}


export default handleAuth({
    async callback(req, res) {
        try {
            await handleCallback(req, res);
        } catch (error) {
            if (error.cause.error == `unauthorized`) {
                res.redirect(
                  `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?${new URLSearchParams({
                    client_id: process.env.AUTH0_CLIENT_ID,
                    returnTo: `${process.env.AUTH0_BASE_URL}/error/unauthorized?errorDescription=${encodeURIComponent(error.cause.errorDescription)}`,
                  })}`
                )

            } else {
                if(error.cause.errorDescription.includes(`verify your email`)) {
                  res.redirect(
                    `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?${new URLSearchParams({
                      client_id: process.env.AUTH0_CLIENT_ID,
                      returnTo: `${process.env.AUTH0_BASE_URL}/error/unauthorized?errorDescription=${encodeURIComponent(`Unknown login error`)}`,
                    })}`
                  )
                } else {
                  res.redirect(
                    `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?${new URLSearchParams({
                      client_id: process.env.AUTH0_CLIENT_ID,
                     returnTo: `${process.env.AUTH0_BASE_URL}/error/unauthorized?errorDescription=${encodeURIComponent(`Unknown login error`)}`,
                    })}`
                  )
                }

            }
            res.end();
        }
    }
});

