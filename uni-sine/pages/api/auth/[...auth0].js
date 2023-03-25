import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';

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
                res.redirect(
                    `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?${new URLSearchParams({
                      client_id: process.env.AUTH0_CLIENT_ID,
                      returnTo: `${process.env.AUTH0_BASE_URL}/error/unauthorized?errorDescription=${encodeURIComponent(`Unknown login error`)}`,
                    })}`
                  )
            }
            res.end();
        }
    }
});
