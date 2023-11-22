import { buffer } from "micro";
import { ManagementClient } from "auth0";
import { welcomeEmail } from "../../../lib/StaticHTMLFiles";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const clientSecret = process.env.CLIENT_SECRET;
  const clientId = process.env.CLIENT_ID;
  const tenantId = process.env.TENANT_ID;
  const aadEndpoint =
    process.env.AAD_ENDPOINT || "https://login.microsoftonline.com";
  const graphEndpoint =
    process.env.GRAPH_ENDPOINT || "https://graph.microsoft.com";

  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        sig,
        process.env.STRIPE_SIGNING_KEY
      );
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      res
        .status(400)
        .send(
          `Webhook Error: An error occurred while verifying the webhook signature.`
        );
      return;
    }
    if (event?.data?.object?.object == "subscription") {
        console.log(event.data.object)
      const stripeCustomerId = event.data.object.customer;
      const customer = await stripe.customers.retrieve(stripeCustomerId);
      const auth0UserId = customer.metadata.auth0_user_id;

      const auth0 = new ManagementClient({
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        scope: "read:users update:users",
      });

      let user;
      try {
        user = await auth0.getUser({ id: auth0UserId });
      } catch (err) {
        console.error(`Error retrieving user: ${err.message}`);
        res.status(404).json({ error: "Invalid user" });
        return;
      }

      if (event.data.object.status == "active") {
        await auth0.updateAppMetadata(
          { id: customer.metadata.auth0_user_id },
          { is_premium: true }
        );
        sendEmail()
      } else if (event.data.object.status == "canceled" || event.data.object.status == "deleted") { // the misspelling of canceled is correct according to stripe for some reason
        await auth0.updateAppMetadata(
          { id: customer.metadata.auth0_user_id },
          { is_premium: false }
        );
      }
      // send email
      async function sendEmail() {
        const msal = require("@azure/msal-node");

        const msalConfig = {
          auth: {
            clientId,
            clientSecret,
            authority: aadEndpoint + "/" + tenantId,
          },
        };

        const tokenRequest = {
          scopes: [graphEndpoint + "/.default"],
        };

        const cca = new msal.ConfidentialClientApplication(msalConfig);
        const tokenInfo = await cca.acquireTokenByClientCredential(
          tokenRequest
        );

        // start user confirm email
        const mailUser = {
          subject: `Welcome to Uni-Sine Premium!`,
          //This "from" is optional if you want to send from group email. For this you need to give permissions in that group to send emails from it.
          from: {
            emailAddress: {
              address: "premium@uni-sine.com",
            },
          },
          toRecipients: [
            {
              emailAddress: {
                address: user.email,
              },
            },
          ],
          body: {
            content: welcomeEmail,
            contentType: "html",
          },
        };
    const bearer = `Bearer ${tokenInfo.accessToken}`;

        const optionsUser = {
          method: "POST",
          headers: {
            Authorization: bearer,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: mailUser, saveToSentItems: false }),
        };
        await fetch(
          graphEndpoint + "/v1.0/users/premium@uni-sine.com/sendMail",
          optionsUser
        )
          .then((res) => {
            if (!res.ok) {
              return res
                .status(500)
                .json({
                  status: "500",
                  message: `error: Internal server error: (user)`,
                });
            } else {
              return res.status(200).json({ name: "contact form sent" });
            }
          })
          .catch((error) => {
            return res
              .status(500)
              .json({
                status: "500",
                message: `error: Internal server error (user internal)`,
              });
          });
      }
    }

    res.status(200).send({
      received: true,
    });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
