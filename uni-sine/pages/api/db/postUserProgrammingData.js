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
    const collection = db.collection('userProgrammingData');
    

    if (req.method === 'POST') {
        const { programmingData } = req.body;

        if (!programmingData) {
            res.status(400).json({ message: "Missing data in request" });
            return;
        }
        try {
            const existingUserDocument = await collection.findOne({ userID: data.user_id });

            if (existingUserDocument) {
              const courseName = programmingData.courseName;
              const existingCourseDataForUser = existingUserDocument.courseData.hasOwnProperty(courseName);
            
              if (existingCourseDataForUser) {
                res.status(200).json({ message: "Course data processed but no updates made!" });
                return ;
              } else {
                // Add new courseData for the user
                const newCourseData = {
                  completed: true,
                  completedDate: new Date().toISOString()
                };
                await collection.updateOne(
                  { userID: data.user_id },
                  { $set: { [`courseData.${courseName}`]: newCourseData } }
                );
                res.status(200).json({ message: "Course data processed successfully!" });
                return;
              }
            } else {
              // Create a new document for the user with courseData object
              const newDocument = {
                createdDate: new Date().toISOString(),
                userID: data.user_id,
                courseData: {
                  [programmingData.courseName]: {
                    completed: true,
                    completedDate: new Date().toISOString()
                  }
                }
              };
              await collection.insertOne(newDocument);
              res.status(200).json({ message: "Course data processed successfully!" });
              return;
            }
            

            
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error"});
            return;
        }

    }

    res.status(405).json({message: "Method not allowed"});
});