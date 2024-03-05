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
    const collection = db.collection('userCourseData');
    

    if (req.method === 'POST') {
        const { courseData } = req.body;

        if (!courseData) {
            res.status(400).json({ message: "Missing data in request" });
            return;
        }
        try {
            const existingUserDocument = await collection.findOne({ userID: data.user_id });

            if (existingUserDocument) {
              const courseName = courseData.courseName;
              const existingCourseDataForUser = existingUserDocument.courseData.hasOwnProperty(courseName);
            
              if (existingCourseDataForUser) {

                // Try to update existing elements in codeMatchPercent
                if (courseData.codeMatchPercent) {
                  const updateResult = await collection.updateOne(
                    { userID: data.user_id, [`courseData.${courseName}.codeMatchPercent.section`]: courseData.section },
                    { $set: { [`courseData.${courseName}.codeMatchPercent.$.percent`]: courseData.codeMatchPercent.percent } }
                  );
                  // If no existing element was updated, add a new one
                  if (updateResult.modifiedCount === 0) {
                    const userDoc = await collection.findOne({ userID: data.user_id });
                    const existingSections = userDoc.courseData[courseName].codeMatchPercent.map(item => item.section);
              
                    if (!existingSections.includes(courseData.codeMatchPercent.section)) {
                      await collection.updateOne(
                        { userID: data.user_id },
                        { $push: { [`courseData.${courseName}.codeMatchPercent`]: courseData.codeMatchPercent } }
                      );
                    }
                  }
                }

              // Update standardQuestions
              if (courseData.standardQuestions) {
                const updateResult = await collection.updateOne(
                  { 
                    userID: data.user_id, 
                    [`courseData.${courseName}.standardQuestions`]: { 
                      $elemMatch: { section: { $in: courseData.standardQuestions.map(item => item.section) } } 
                    }
                  },
                  { $set: { [`courseData.${courseName}.standardQuestions.$[elem].isCorrect`]: true } },
                  { 
                    arrayFilters: [ { "elem.section": { $in: courseData.standardQuestions.map(item => item.section) } } ]
                  }
                );

                // If no existing elements were updated, add new ones
                if (updateResult.modifiedCount === 0) {
                  const userDoc = await collection.findOne({ userID: data.user_id });
                  const existingSections = userDoc.courseData[courseName].standardQuestions.map(item => item.section);

                  const newStandardQuestions = courseData.standardQuestions.filter(
                    item => !existingSections.includes(item.section)
                  );

                  if (newStandardQuestions.length > 0) {
                    await collection.updateOne(
                      { userID: data.user_id },
                      { $push: { [`courseData.${courseName}.standardQuestions`]: { $each: newStandardQuestions } } }
                    );
                  }
                }
              }
            
                // Update questionsCompleted
                if (courseData.questionsCompleted) {
                  await collection.updateOne(
                    { userID: data.user_id },
                    { $set: { [`courseData.${courseName}.questionsCompleted`]: courseData.questionsCompleted } }
                  );
                }
            
                // Update completedSections
                await collection.updateOne(
                  { userID: data.user_id },
                  { $addToSet: { [`courseData.${courseName}.completedSections`]: courseData.section } }
                );
              } else {
                // Add new courseData for the user
                const newCourseData = {
                  completedSections: [courseData.section],
                  codeMatchPercent: courseData.codeMatchPercent ? [courseData.codeMatchPercent] : [],
                  standardQuestions: courseData.standardQuestions ? [courseData.standardQuestions] : [],
                  questionsCompleted: courseData.questionsCompleted ? [courseData.questionsCompleted] : []
                };
                await collection.updateOne(
                  { userID: data.user_id },
                  { $set: { [`courseData.${courseName}`]: newCourseData } }
                );
              }
            } else {
              // Create a new document for the user with courseData object
              const newDocument = {
                createdDate: new Date(),
                userID: data.user_id,
                courseData: {
                  [courseData.courseName]: {
                    completedSections: [courseData.section],
                    codeMatchPercent: courseData.codeMatchPercent ? [courseData.codeMatchPercent] : [],
                    standardQuestions: courseData.standardQuestions ? [courseData.standardQuestions] : [],
                    questionsCompleted: courseData.questionsCompleted ? [courseData.questionsCompleted] : []
                  }
                }
              };
              await collection.insertOne(newDocument);
            }
            
            res.status(200).json({ message: "Course data processed successfully!" });
            return;
            
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error"});
            return;
        }

    }

    res.status(405).json({message: "Method not allowed"});
});
