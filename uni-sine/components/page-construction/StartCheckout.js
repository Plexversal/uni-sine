import { loadStripe } from "@stripe/stripe-js";

import { sendGTMEvent } from '@next/third-parties/google'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default async function startCheckout() {


  let userData;

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/auth0/auth0-user`);
      const data = await response.json();
      if (!data) {
        throw new Error("Error loading user data");
      }
      if (response.status == 401)
        return (window.location.href = `/api/auth/login?returnTo=${window.location.pathname}`);
      userData = data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  await fetchData();
  if(userData) {
    const res = await fetch("/api/payment/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stripeCustomerId: userData?.app_metadata?.stripe_customer_id,
      }),
    });
  
    const { sessionId } = await res.json();
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId });
  }

}
