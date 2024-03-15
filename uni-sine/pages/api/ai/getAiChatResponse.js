
import OpenAI from "openai";
import {
    withApiAuthRequired,
    getSession
} from "@auth0/nextjs-auth0";
import { OpenAIStream, StreamingTextResponse } from 'ai';
export default withApiAuthRequired(async function handler(req, res) {
    
    try {

        const session = await getSession(req, res);
        if (!session) {
            res.json({ message: 'You need premium to use this feature. Click Account on the sidebar to subscribe.', endOfChat: true });
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
            res.status(401).json({ message: 'You need premium to use this feature. Click Account on the sidebar to subscribe.', endOfChat: true });
            
            return;
        }

        if(!data.app_metadata.is_premium) {

            res.status(401).json({ message: 'You need premium to use this feature. Click Account on the sidebar to subscribe.', endOfChat: true });
            return;
        }

        if(!req.body.chat) return res.status(400).json({message: "Chat was not supplied to complete request."});
        const MAX_MESSAGES = 75;
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const { chat, history, context } = req.body;
        if (history.length > MAX_MESSAGES) {
            const limitReachedResponse = "You have reached the maximum number of messages. Please start a new chat.";
            res.status(429).json({ message: limitReachedResponse, endOfChat: true });
            return;
        }
        let content = ''
        if(context) {
            content = `${chat}\nThe user provided additional context: ${context}`
        } else {
            content = chat
        }

        if (content.length > 3600) {
            res.status(413).json({ message: 'Your message and context exceed what can be processed, try a summarising your question or select a smaller context.', endOfChat: true });
            return;
        }
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: history.concat([{ role: "user", content: content }]),
            stream: true
        });
        

        const stream = OpenAIStream(chatCompletion);

        // Respond with the stream
        return new StreamingTextResponse(stream);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
   
});
