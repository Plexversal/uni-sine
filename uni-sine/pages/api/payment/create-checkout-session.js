
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import {
    withApiAuthRequired,
    getSession
} from "@auth0/nextjs-auth0";
import { ManagementClient } from 'auth0';

export default withApiAuthRequired(async function handler(req, res) {
    const session = await getSession(req, res);
    if (!session) {
        res.status(401).end('Unauthorized');
        return;
      }
    const {
        stripeCustomerId
    } = req.body;

    if (!stripeCustomerId) {
        return res.status(400).send("Missing Stripe Customer ID");
      }
    
      const auth0 = new ManagementClient({
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        scope: 'read:users',
    });
    const userProfile = await auth0.getUser({ id: session.user.sub });

    if (userProfile.app_metadata.stripe_customer_id !== stripeCustomerId) {
        return res.status(403).send({error: "Unauthorized"});
    }


    const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price: ((userProfile.app_metadata.region === 'NA' || userProfile.app_metadata.region === 'SA') ? process.env.STRIPE_PRICE_ID_USD : process.env.STRIPE_PRICE_ID_GBP),
            quantity: 1,
        }, ],
        customer: stripeCustomerId,
        mode: 'subscription',
        success_url: `${req.headers.origin}/subscribed`,
        cancel_url: `${req.headers.origin}/`,
        allow_promotion_codes: true
    });

    res.json({
        sessionId: stripeSession.id
    });
});