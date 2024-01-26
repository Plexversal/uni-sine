
import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai';
export const runtime = 'edge';
import { getSession } from '@auth0/nextjs-auth0/edge';


export default async function POST(request, res) {


    const { messages } = await request.json()

    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    })
    const openai = new OpenAIApi(config);

    if (!messages) {
        return new Response(JSON.stringify({message: "Chat was not supplied to complete request."}), { status: 400 });
    }
    const MAX_MESSAGES = 75;
    if (messages.length > MAX_MESSAGES) {
        const limitReachedResponse = "You have reached the maximum number of messages. Please start a new chat.";
        return new Response(JSON.stringify({ message: limitReachedResponse, endOfChat: true }), { status: 429 });
    }

    const MAX_CONTENT_LENGTH = 3600;
    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage.role === 'user' && lastUserMessage.content.length > MAX_CONTENT_LENGTH) {
        return new Response(JSON.stringify({ message: 'Your message exceeds the maximum length that can be processed. Please shorten your message.', endOfChat: true }), { status: 413 });
    }
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "system", content: "You are a chat assistant helping users with math and science questions. Users can provide you with additional context to explain by highlighting content on the page, so if you think context is missing feel free to remind them of this."
        }, ...messages],
        stream: true
    });

    const stream = await OpenAIStream(response)

    return new StreamingTextResponse(stream)

}