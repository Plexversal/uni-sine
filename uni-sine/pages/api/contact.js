// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async function handler(req, response) {
    const msal = require('@azure/msal-node');
  
    const gSecret = process.env.CAPTCHA_TOKEN;
    const gResponse = req.body.token;
  
    await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${gSecret}&response=${gResponse}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      "Accept-Encoding": "identity" },
    }).then(
      res => res.json()
      ).then(data => 
        {
          if(!data.success) return response.status(422).json({status: '422', message: `error: failed Google captcha`})
        }) .catch(err => {
            console.error(err)
            return response.status(500).json({status: '500', message: `error: Internal server error`})
           })
  
  
    if(!req.body.name) return response.status(400).json({status: '400', message: 'error: No \'name\' provided in request.'})
    if(!req.body.email) return response.status(400).json({status: '400', message: 'error: No \'email\' provided in request.'})
    if(!req.body.messageText) return response.status(400).json({status: '400', message: 'error: No \'messageText\' provided in request.'})
    if(!/(?:[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i.test(req.body.email)) {
      return response.status(400).json({status: '400', message: `error: Email provided was not an acceptable format`})
    }
    if(req.body.name.length > 150) return response.status(400).json({status: '400', message: `error: name provided was not an acceptable format`})
    if(req.body.email.length > 150) return response.status(400).json({status: '400', message: `error: email provided was not an acceptable format`})
  
  
  
    const clientSecret = process.env.CLIENT_SECRET;
    const clientId = process.env.CLIENT_ID;
    const tenantId = process.env.TENANT_ID;
    const aadEndpoint = process.env.AAD_ENDPOINT || 'https://login.microsoftonline.com';
    const graphEndpoint = process.env.GRAPH_ENDPOINT || 'https://graph.microsoft.com';
  
    const msalConfig = {
      auth: {
        clientId,
        clientSecret,
        authority: aadEndpoint + '/' + tenantId,
      },
    };
  
    const tokenRequest = {
      scopes: [graphEndpoint + '/.default'],
    };
  
    const cca = new msal.ConfidentialClientApplication(msalConfig);
    const tokenInfo = await cca.acquireTokenByClientCredential(tokenRequest);
  
  
  // start support request receive email
    const mail = {
      subject: `New uni-sine support request : ${req.body.name}`,
      //This "from" is optional if you want to send from group email. For this you need to give permissions in that group to send emails from it.
      from: {
        emailAddress: {
          address: 'support@uni-sine.com',
        },
      },
      toRecipients: [
        {
          emailAddress: {
            address: 'support@uni-sine.com',
          },
        },
      ],
      body: {
        content:
          ` <div> 
          <h2>Contact Email:</h2>
          <p>${req.body.email}</p>
          <h2>Message:</h2>
          <p>${req.body.messageText}</p>
          <br><br>
          <p><strong>This information is deemed confidential and should only be used within the scope of official business use only.</strong></p>
          </div> `,
        contentType: 'html',
      },
    };
    const bearer = `Bearer ${tokenInfo.accessToken}`;
    const options = {
      method: 'POST',
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: mail, saveToSentItems: false }),
    };
  
  
    await fetch(
      graphEndpoint + '/v1.0/users/support@uni-sine.com/sendMail',
      options
    ).then(res => {
      if(!res.ok){
        console.log(res)

        return response.status(500).json({status: '500', message: `error: Internal server error (support) ${res}`});
      }
    }).catch(error => {
      return response.status(500).json({status: '500', message: `error: Internal server error (support internal)`})
  });


  // start user confirm email
  const mailUser = {
    subject: `Uni-Sine: Support Request`,
    //This "from" is optional if you want to send from group email. For this you need to give permissions in that group to send emails from it.
    from: {
      emailAddress: {
        address: 'support@uni-sine.com',
      },
    },
    toRecipients: [
      {
        emailAddress: {
          address: req.body.email,
        },
      },
    ],
    body: {
      content:
        ` <div> 
        <p>This email is to confirm we have got your request and we will aim to contact you in 48hrs. Find a copy of your request below:</p>
    
        <h2>Your Message:</h2>
        <p>${req.body.messageText}</p>
        <br><br>
        </div> `,
      contentType: 'html',
    },
  };
  const optionsUser = {
    method: 'POST',
    headers: {
      'Authorization': bearer,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: mailUser, saveToSentItems: false }),
  };
  await fetch(
    graphEndpoint + '/v1.0/users/support@uni-sine.com/sendMail',
    optionsUser
  ).then(res => {
    if(!res.ok){
      return response.status(500).json({status: '500', message: `error: Internal server error: (user)`});
    } else {
      return response.status(200).json({ name: 'contact form sent' });
    }
  }).catch(error => {
    return response.status(500).json({status: '500', message: `error: Internal server error (user internal)`})
});


  }
  