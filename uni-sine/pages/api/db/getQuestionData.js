import clientPromise from '../../../lib/connectDb.js'
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
    const subject = req.query.subject;
    const date = new Date().toISOString().substring(0, 10); // Current date
    const session = await getSession(req, res);
    
    if (!session) {
        res.status(401).end('Unauthorized');
        return;
    }

    // Your authentication and user data fetching logic remains unchanged
    
    const client = await clientPromise;
    const db = client.db('uni-sine_master_db');
    const collection = db.collection('dailyQuestions');
    
    try {
        // Try to find a document for the current date
        let document = await collection.findOne({
            "createdDate": date,
            [`${subject}`]: { $exists: true }
        });
    
        // If no document exists for the current date, find the latest before today
        if (!document) {
            const documentsBeforeToday = await collection.find({
                "createdDate": { $lt: date },
                [`${subject}`]: { $exists: true }
            }).sort({ "createdDate": -1 }).limit(1).toArray(); // Sorting in descending order and limiting to 1
    
            if (documentsBeforeToday.length === 0) {
                return res.status(404).json({ message: "Not found any entries before the specified date" });
            }
    
            document = documentsBeforeToday[0]; // Since we limit the result to 1, we take the first element of the array
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
