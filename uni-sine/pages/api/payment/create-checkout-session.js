
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import {
    withApiAuthRequired,
    getSession
} from "@auth0/nextjs-auth0";


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

    const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price: process.env.STRIPE_PRICE_ID,
            quantity: 1,
        }, ],
        customer: stripeCustomerId,
        mode: 'subscription',
        success_url: `${req.headers.origin}/calculators`,
        cancel_url: `${req.headers.origin}/`,
    });

    res.json({
        sessionId: stripeSession.id
    });
});