import { loadStripe } from "@stripe/stripe-js";

import { sendGTMEvent } from '@next/third-parties/google'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default async function startCheckout(user) {


  if(user) {

    sendGTMEvent({event: 'start_checkout',
    contents: {
      content_type: "subscription",
      content_name: "premium",
      content_id: 1,
      currency: ((user?.app_metadata.region === 'NA' || user?.app_metadata.region === 'SA') ? 'USD' : 'GBP'),
      email: user.email,
      external_id: user.user_id,
      value: ((user?.app_metadata.region === 'NA' || user?.app_metadata.region === 'SA') ? 15 : 10),
      event_id: Math.floor(1e9 + Math.random() * 9e9).toString()
      }
    })

    const premiumData = {
      'isAlreadyPremium': user?.app_metadata.is_premium,
      'subscribedAfterRedirect': false
    };

    localStorage.setItem('premiumData', JSON.stringify(premiumData));

    const res = await fetch("/api/payment/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stripeCustomerId: user?.app_metadata?.stripe_customer_id,
      }),
    });
  
    const { sessionId } = await res.json();
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId });
  }

}
