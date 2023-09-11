import clientPromise from '../../../lib/connectDb.js'

import {
    withApiAuthRequired,
    getSession
} from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
    const subject = req.query.subject;
    const date = new Date().toISOString().substring(0, 10);
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

    if(!data.app_metadata.is_premium ) {

        res.status(401).json({message: "no premium"});
        return;
    }

    const client = await clientPromise;
    const db = client.db('uni-sine_master_db');
    const collection = db.collection('dailyQuestions');
    
    try {
        // Find the document with the specified date
        let document = await collection.findOne({
            "createdDate": date,
            [`${subject}`]: { $exists: true }
        });
    
        // if document does not exist with that date then set document to be the last entry in the collection
        if (!document) {
            const lastEntry = await collection.find({ [`${subject}`]: { $exists: true } })
            .sort({ "createdDate": -1 })
            .limit(1)
            .toArray();
    
            if (lastEntry.length === 0) {
                return res.status(404).json({ message: "Not found with specified date" });
            }
    
            document = lastEntry[0];
        }
    
        const subjectData = document[subject];
    
        if (!subjectData) {
            return res.status(404).json({ message: "Subject not found" });
        }
    
        res.status(200).json(subjectData);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Internal Server Error" });
    }
    
});
