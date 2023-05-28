
import {buffer} from 'micro';
import { ManagementClient } from 'auth0';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const buf = await buffer(req);
        const sig = req.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_SIGNING_KEY);
        } catch (err) {
            console.log(`Webhook Error: ${err.message}`);
            res.status(400).send(`Webhook Error: An error occurred while verifying the webhook signature.`);
            return;
        }
        if (event?.data?.object?.object == 'subscription') {
            const stripeCustomerId = event.data.object.customer;
            const customer = await stripe.customers.retrieve(stripeCustomerId);
            const auth0UserId = customer.metadata.auth0_user_id;

            const auth0 = new ManagementClient({
                domain: process.env.AUTH0_DOMAIN,
                clientId: process.env.AUTH0_CLIENT_ID,
                clientSecret: process.env.AUTH0_CLIENT_SECRET,
                scope: 'read:users update:users',
            });
            
            let user;
            try {
                user = await auth0.getUser({ id: auth0UserId });
            } catch (err) {
                console.error(`Error retrieving user: ${err.message}`);
                res.status(404).json({error: 'Invalid user'});
                return;
            }

            if(event.data.object.status == 'active') {
                await auth0.updateAppMetadata({ id: customer.metadata.auth0_user_id }, { is_premium: true });
            } else if(event.data.object.status == 'canceled') {
                await auth0.updateAppMetadata({ id: customer.metadata.auth0_user_id }, { is_premium: false });
            }
        }

        res.status(200).send({
            received: true
        });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
};

export const config = {
    api: {
        bodyParser: false,
    },
};
