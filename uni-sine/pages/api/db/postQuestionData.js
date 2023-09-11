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

    if(!data.app_metadata.is_admin) {

        res.status(401).json({message: "User does not have suffecient permissions to access this resource"});
        return;
    }

    const client = await clientPromise;
    const db = client.db('uni-sine_master_db');
    const collection = db.collection('dailyQuestions');
    

    if (req.method === 'POST') {
        if(req.query.fullData == `true`) {
            try {
                if (!req.body.easy || !req.body.medium || !req.body.hard) {
                    throw new Error("Parsed data is missing required fields");
                  }
                  for (const difficulty of ["easy", "medium", "hard"]) {
                    req.body[difficulty].forEach((question) => {
                      question.questionID = new ObjectId();
                    });
                  }
        
                  // Check if a document with the current date already exists
                  let existingDocument = await collection.findOne({
                    createdDate: req.body.date,
                  });

        
                  if (existingDocument) {
                    // If a document exists, update it
                    for (const difficulty of ["easy", "medium", "hard"]) {
                        console.log(difficulty)
                      const updatePath = `${req.body.topic}Questions.${difficulty}`;
                      console.log(req.body[difficulty])
                      await collection.updateOne(
                        { createdDate: req.body.date },
                        { $push: { [updatePath]: { $each: req.body[difficulty] } } }
                      );
                    }
                  } else {
                    // If no document exists, create a new one
                    const newDocument = {
                      createdDate: req.body.date,
                      [`${req.body.topic}Questions`]: {
                        easy: req.body.easy,
                        medium: req.body.medium,
                        hard: req.body.hard,
                      },
                    };
        
                    await collection.insertOne(newDocument);
                  }
                  return res.status(200).json({message: "Questions processed successfully!"});
            } catch (error) {
                console.error(error)
                return res.status(500).json({message: 'Failed to parse data', error: error})
            }
        }
        const {
            date,
            difficulty,
            subject,
            newQuestion,
            correctAnswer,
            wrongAnswer1,
            wrongAnswer2,
            wrongAnswer3,
            requiresMedia,
            isAnswersEquation,
            mediaType,
            equation,
            graphEquation,
            trigSides,
            showTrigValues,
            hideTrigValues,
            vector,
            answerType
            
        } = req.body;
    
        let media = null
        // Validate data
        if (!difficulty || !subject || !newQuestion || !correctAnswer || !wrongAnswer1 || !wrongAnswer2 || !wrongAnswer3 || !date || !answerType) {
            res.status(400).json({ message: "Missing data in request" });
            return;
        }
        
        if(!["easy", "medium", "hard"].includes(difficulty)) {
            res.status(400).json({ message: "Invalid difficulty" });
            return;
        }
    
        if(!["math", "physics", "comp"].includes(subject)) {
            res.status(400).json({ message: "Invalid subject" });
            return;
        }
    

        if (requiresMedia) {
            if (!mediaType) return res.status(400).json({ message: "Missing media type" });
        
            if (!["equation", "graph", "trig", "vector"].includes(mediaType)) {
                return res.status(400).json({ message: "Invalid media type" });
            }
        
            switch (mediaType) {
                case "equation":
                    if (!equation) return res.status(400).json({ message: "Missing equation data" });
                    media = equation;
                    break;
        
                case "graph":
                    if (!graphEquation) return res.status(400).json({ message: "Missing graph equation data" });
                    media = graphEquation;
                    break;
        
                case "trig":
                    if (!trigSides) return res.status(400).json({ message: "Missing trig data" });
        
                    let sideA = parseFloat(trigSides.sideA);
                    let sideB = parseFloat(trigSides.sideB);
                    let sideC = parseFloat(trigSides.sideC);
                    if (isNaN(sideA) || isNaN(sideB) || isNaN(sideC)) {
                        return res.status(400).json({ message: "Invalid triangle side values provided" });
                    }
                    if (sideA + sideB <= sideC ||
                        sideA + sideC <= sideB ||
                        sideB + sideC <= sideA) {
                        return res.status(400).json({ message: "Invalid triangle sides" });
                    }
        
                    media = {
                        sides: { sideA, sideB, sideC },
                        showTrigValues: showTrigValues,
                        hideTrigValues: hideTrigValues
                    };
                    break;
        
                case "vector":
                    if (!vector) return res.status(400).json({ message: "Missing vector data" });
                    media = vector;
                    break;
        
                default:
                    return res.status(400).json({ message: "Unsupported media type" });
            }
        }
        
            function isString(value) {
                return typeof value === 'string';
            }
            
            function isBoolean(value) {
                return typeof value === 'boolean';
            }
            
            function isObjectId(value) {
                return typeof value === 'object' && value instanceof ObjectId;
            }
            
            function validAnswers(answers) {
                return Array.isArray(answers) &&
                answers.length === 4 &&
                answers.every(answer => 
                    isString(answer.text) && isBoolean(answer.isCorrect)
                );
            }
            
            // Validate the incoming data
            if (
                !isObjectId(new ObjectId()) ||
                !isString(newQuestion) ||
                !isString(answerType) ||
                !validAnswers([
                { text: correctAnswer, isCorrect: true },
                { text: wrongAnswer1, isCorrect: false },
                { text: wrongAnswer2, isCorrect: false },
                { text: wrongAnswer3, isCorrect: false }
                ]) ||
                !isBoolean(requiresMedia) ||
                !isBoolean(isAnswersEquation)  
            ) {
                res.status(400).json({ message: "Invalid data types provided" });
                return;
            }
            
            const question = {
                questionID: new ObjectId(),
                question: newQuestion,
                answers: [
                { text: correctAnswer, isCorrect: true },
                { text: wrongAnswer1, isCorrect: false },
                { text: wrongAnswer2, isCorrect: false },
                { text: wrongAnswer3, isCorrect: false }
                ],
                requiresMedia: requiresMedia,
                isAnswersEquation: isAnswersEquation,
                answerType: answerType,
                mediaType: mediaType || null,
                media: media || null
            };
            
        const existingDocument = await collection.findOne({ createdDate: date });

        if (existingDocument) {
            const updatePath = `${subject}Questions.${difficulty}`;
            await collection.updateOne(
                { createdDate: date },
                { $push: { [updatePath]: question } }
            );
        } else {
            const newDocument = {
                createdDate: date,
                [`${subject}Questions`]: {
                    [difficulty]: [question]
                }
            };

            await collection.insertOne(newDocument);
        }

        res.status(200).json({message: "Question processed successfully!"});
        return;
    }

    res.status(405).json({message: "Method not allowed"});
});
