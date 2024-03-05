import clientPromise from '../../../lib/connectDb.js'
import { ObjectId } from 'mongodb'

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
    const collection = db.collection('userReports');
    

    if (req.method === 'POST') {
        const { reportData } = req.body;

        if (!reportData) {
            res.status(400).json({ message: "Missing data in request" });
            return;
        }

        try {
            // prevent duplication
            const existingUserDocument = await collection.findOne({ report: reportData.report, userID: data.user_id })
            if(existingUserDocument) {
                return res.status(403).json({message: "Report entry already exists"});
    
            } else {
                const newDocument = {
                    userID: data.user_id,
                    report: reportData.report,
                    time: new Date(),
                    currentQuestionID: new ObjectId(reportData.currentQuestionID) ,
    
                };
                await collection.insertOne(newDocument);
            }
    
            res.status(200).json({message: "Question processed successfully!"});
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error"});
            return;
        }

    }

    res.status(405).json({message: "Method not allowed"});
});
