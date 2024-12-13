import clientPromise from '../../../lib/connectDb.js'

import {
    withApiAuthRequired,
    getSession
} from "@auth0/nextjs-auth0";


export default withApiAuthRequired(async function handler(req, res) {
    
    try {
        const session = await getSession(req, res);
        
        if (!session) {
            res.status(401).end('Unauthorized');
            return;
        }
    
        const Auth0Data = {
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: "https://uni-sine.eu.auth0.com/api/v2/",
            grant_type: "client_credentials"
        }
        const tokenResponse = await fetch('https://uni-sine.eu.auth0.com/oauth/token', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(Auth0Data)
        });
        const token = await tokenResponse.json()
        const userResponse = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${session.user.sub}`, {
            method: 'GET',
            headers: { "authorization": `Bearer ${token.access_token}` },
        })
        const data = await userResponse.json()
    
        if(!data) {
            res.status(401).json({message: "Unauthorized"});
            return;
        }
    
        const client = await clientPromise;
        const db = client.db('uni-sine_master_db');
        const collection = db.collection('userProgrammingData');

        const existingUserDocument = await collection.findOne({ userID: data.user_id });

        if(existingUserDocument.courseData) {
            return res.status(200).json(existingUserDocument.courseData);
        } else {
            return res.status(404).json({message: "No data found for user"});
        }
    
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
   
});
