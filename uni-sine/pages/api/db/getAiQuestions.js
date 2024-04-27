
import OpenAI from "openai";
import {
    withApiAuthRequired,
    getSession
} from "@auth0/nextjs-auth0";
import { mathSubtopic, physicsSubtopic, compSubtopic, biologySubtopic, aiFunction, chemistrySubtopic, calculusSubtopic } from '../../../lib/schemaConstants'

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

        if(!data.app_metadata.is_admin) {

            res.status(401).json({message: "User does not have suffecient permissions to access this resource"});
            return;
        }

        if(req.query.topic == `math`) {

                const randomTopicSelection = mathSubtopic.sort(() => 0.5 - Math.random()).slice(0, 7).join(', ');
                console.log(`topics selected: ${randomTopicSelection}`)
        
                let level = 'A-level'
                let example = `The equation of a curve is (x+y)^2 = 4y + 2x + 8. Find the equation of the normal to the curve at P, giving your answer in the form ax + by = c , where a, b and c are integers.`

                const openai = new OpenAI({
                    apiKey: process.env.OPENAI_API_KEY,
                });
        
                const chatCompletion = await openai.chat.completions.create({
                    messages: [
                        { role: "system", content: "You are a programming assistant with the sole purpose to output question data for a database and provide no other context, your responses should be in json only without new lines or additional spaces in the json response" },
                        { role: "user", content: `Create 2 easy, 3 medium and 2 hard ${req.query.topic} questions for a total of 7 questions. Based on the following topics ${randomTopicSelection}, meaning one question per topic, that would be suitable for ${level} students. An example question would be: ${example}. Produce the answer in text, 3 wrong answers and 1 correct answer. Each question should include supporting media in Latex format for MathJax library. All answers that are equation based should use MathJax type formatting to be parsed by MathJax library. Do not include any new line characters in the response such as ("\\n") or excessive spacing. Ensure the json complies with parsing, making sure equation backslahes are double. You MUST stick to the schema, do not add key names or modify the object structure.` }
                    ],
                    model: "gpt-4",
                    temperature: 0.3,
                    functions: [aiFunction]
                });

                try {
                  let parsed = JSON.parse(chatCompletion.choices[0].message.function_call.arguments)
                  return res.status(200).json({message: "Questions fetched and parsed", chat: parsed, parsed: true});
                
                } catch (error) {
                  if(chatCompletion) {
                    return res.status(200).json({message: "Questions fetched but not parsed", chat: chatCompletion.choices[0].message.function_call.arguments, error: error.message, parsed: false});

                  } else {
                    return res.status(500).json({message: 'failed to get any AI chat data', error: error.message})
                  } 
                }
  

        } else if(req.query.topic == `physics`) {

          const randomTopicSelection = physicsSubtopic.sort(() => 0.5 - Math.random()).slice(0, 10).join(', ');
          console.log(`topics selected: ${randomTopicSelection}`)

  
          let level = 'A-level'
          let example = `High-energy electrons with a de brogile wavelength of 3.00 fm are diffraacted by a carbon-12 nucleus (radius = 2.7 * 10^-15m). Estimate the angle at which the first minimum appears on the electron beam's diffraction pattern.`

          const openai = new OpenAI({
              apiKey: process.env.OPENAI_API_KEY,
          });
  
          const chatCompletion = await openai.chat.completions.create({
              messages: [
                  { role: "system", content: "You are a programming assistant with the sole purpose to output question data for a database and provide no other context, your responses should be in json only without new lines or additional spaces in the json response" },
                  { role: "user", content: `Create 3 easy, 4 medium and 3 hard ${req.query.topic} questions for a total of 7 questions. Based on the following topics ${randomTopicSelection}, meaning one question per topic, that would be suitable for ${level} students. Questions must require the student to use math to work out and should not be generic. An example question would be: ${example}. Do not reuse the example. Produce the answer in text, 3 wrong answers and 1 correct answer. Each question should include supporting media in Latex format for MathJax library. All answers that are equation based should use MathJax type formatting to be parsed by MathJax library. Do not include any new line characters in the response such as ("\\n") or excessive spacing. Ensure the json complies with parsing, making sure equation backslahes are double. You MUST stick to the schema, do not add key names or modify the object structure.`  }
              ],
              model: "gpt-4",
              temperature: 0.3,
              functions: [aiFunction]
          });

          try {
            let parsed = JSON.parse(chatCompletion.choices[0].message.function_call.arguments)
            return res.status(200).json({message: "Questions fetched and parsed", chat: parsed, parsed: true});
          
          } catch (error) {
            if(chatCompletion) {
              return res.status(200).json({message: "Questions fetched but not parsed", chat: chatCompletion.choices[0].message.function_call.arguments, error: error.message, parsed: false});

            } else {
              return res.status(500).json({message: 'failed to get any AI chat data', error: error.message})
            } 
          }


        } else if(req.query.topic == `comp`) {

          const randomTopicSelection = compSubtopic.sort(() => 0.5 - Math.random()).slice(0, 8).join(', ');
          console.log(`topics selected: ${randomTopicSelection}`)
  
          let level = 'A-level'
          let example = `If the execution of an asynchronous function takes 30 seconds to return a response, how long will it take for subsequent code to execute?`

          const openai = new OpenAI({
              apiKey: process.env.OPENAI_API_KEY,
          });
  
          const chatCompletion = await openai.chat.completions.create({
              messages: [
                  { role: "system", content: "You are a programming assistant with the sole purpose to output question data for a database and provide no other context, your responses should be in json only without new lines or additional spaces in the json response" },
                  { role: "user", content: `Create 3 easy, 3 medium and 2 hard ${req.query.topic} questions for a total of 8 questions. Based on the following topics ${randomTopicSelection}, meaning one question per topic, that would be suitable for ${level} students. About half the questions should require the student to use math to work out and should not be generic. An example question would be: ${example}. Do not reuse the example. Produce the answer in text, 3 wrong answers and 1 correct answer. Each question should include supporting media in Latex format for MathJax library. All answers that are equation based should use MathJax type formatting to be parsed by MathJax library. Do not include any new line characters in the response such as ("\\n") or excessive spacing. Ensure the json complies with parsing, making sure equation backslahes are double. You MUST stick to the schema, do not add key names or modify the object structure.` }
              ],
              model: "gpt-4",
              temperature: 0.4,
              functions: [aiFunction]
          });

          try {
            let parsed = JSON.parse(chatCompletion.choices[0].message.function_call.arguments)
            return res.status(200).json({message: "Questions fetched and parsed", chat: parsed, parsed: true});
          
          } catch (error) {
            if(chatCompletion) {
              return res.status(200).json({message: "Questions fetched but not parsed", chat: chatCompletion.choices[0].message.function_call.arguments, error: error.message, parsed: false});

            } else {
              return res.status(500).json({message: 'failed to get any AI chat data', error: error.message})
            } 
          }



        } else if(req.query.topic == `biology`) {

          const randomTopicSelection = biologySubtopic.sort(() => 0.5 - Math.random()).slice(0, 8).join(', ');
          console.log(`topics selected: ${randomTopicSelection}`)
  
          let level = 'A-level'
          let example = `If the execution of an asynchronous function takes 30 seconds to return a response, how long will it take for subsequent code to execute?`

          const openai = new OpenAI({
              apiKey: process.env.OPENAI_API_KEY,
          });
  
          const chatCompletion = await openai.chat.completions.create({
              messages: [
                  { role: "system", content: "You are a programming assistant with the sole purpose to output question data for a database and provide no other context, your responses should be in json only without new lines or additional spaces in the json response" },
                  { role: "user", content: `Create 4 easy, 4 medium and 2 hard ${req.query.topic} questions for a total of 10 questions. Based on the following topics ${randomTopicSelection}, meaning one question per topic, that would be suitable for ${level} students. About half the questions should require the student to use math to work out and should not be generic. An example question would be: ${example}. Do not reuse the example. Produce the answer in text, 3 wrong answers and 1 correct answer. Each question should include supporting media in Latex format for MathJax library. All answers that are equation based should use MathJax type formatting to be parsed by MathJax library. Do not include any new line characters in the response such as ("\\n") or excessive spacing. Ensure the json complies with parsing, making sure equation backslahes are double. You MUST stick to the schema, do not add key names or modify the object structure.` }
              ],
              model: "gpt-4",
              temperature: 0.4,
              functions: [aiFunction]
          });

          try {
            let parsed = JSON.parse(chatCompletion.choices[0].message.function_call.arguments)
            return res.status(200).json({message: "Questions fetched and parsed", chat: parsed, parsed: true});
          
          } catch (error) {
            if(chatCompletion) {
              return res.status(200).json({message: "Questions fetched but not parsed", chat: chatCompletion.choices[0].message.function_call.arguments, error: error.message, parsed: false});

            } else {
              return res.status(500).json({message: 'failed to get any AI chat data', error: error.message})
            } 
          }



        } else if(req.query.topic == `chemistry`) {

          const randomTopicSelection = chemistrySubtopic.sort(() => 0.5 - Math.random()).slice(0, 8).join(', ');
          console.log(`topics selected: ${randomTopicSelection}`)
  
          let level = 'A-level'
          let example = `If the execution of an asynchronous function takes 30 seconds to return a response, how long will it take for subsequent code to execute?`

          const openai = new OpenAI({
              apiKey: process.env.OPENAI_API_KEY,
          });
  
          const chatCompletion = await openai.chat.completions.create({
              messages: [
                  { role: "system", content: "You are a programming assistant with the sole purpose to output question data for a database and provide no other context, your responses should be in json only without new lines or additional spaces in the json response" },
                  { role: "user", content: `Create 4 easy, 4 medium and 2 hard ${req.query.topic} questions for a total of 10 questions. Based on the following topics ${randomTopicSelection}, meaning one question per topic, that would be suitable for ${level} students. About half the questions should require the student to use math to work out and should not be generic. An example question would be: ${example}. Do not reuse the example. Produce the answer in text, 3 wrong answers and 1 correct answer. Each question should include supporting media in Latex format for MathJax library. All answers that are equation based should use MathJax type formatting to be parsed by MathJax library. Do not include any new line characters in the response such as ("\\n") or excessive spacing. Ensure the json complies with parsing, making sure equation backslahes are double. You MUST stick to the schema, do not add key names or modify the object structure.` }
              ],
              model: "gpt-4",
              temperature: 0.4,
              functions: [aiFunction]
          });

          try {
            let parsed = JSON.parse(chatCompletion.choices[0].message.function_call.arguments)
            return res.status(200).json({message: "Questions fetched and parsed", chat: parsed, parsed: true});
          
          } catch (error) {
            if(chatCompletion) {
              return res.status(200).json({message: "Questions fetched but not parsed", chat: chatCompletion.choices[0].message.function_call.arguments, error: error.message, parsed: false});

            } else {
              return res.status(500).json({message: 'failed to get any AI chat data', error: error.message})
            } 
          }



        } else if(req.query.topic == `calculus`) {

          const randomTopicSelection = calculusSubtopic.sort(() => 0.5 - Math.random()).slice(0, 8).join(', ');
          console.log(`topics selected: ${randomTopicSelection}`)
  
          let level = 'A-level'
          let example = `If the execution of an asynchronous function takes 30 seconds to return a response, how long will it take for subsequent code to execute?`

          const openai = new OpenAI({
              apiKey: process.env.OPENAI_API_KEY,
          });
  
          const chatCompletion = await openai.chat.completions.create({
              messages: [
                  { role: "system", content: "You are a programming assistant with the sole purpose to output question data for a database and provide no other context, your responses should be in json only without new lines or additional spaces in the json response" },
                  { role: "user", content: `Create 4 easy, 4 medium and 2 hard ${req.query.topic} questions for a total of 10 questions. Based on the following topics ${randomTopicSelection}, meaning one question per topic, that would be suitable for ${level} students. About half the questions should require the student to use math to work out and should not be generic. An example question would be: ${example}. Do not reuse the example. Produce the answer in text, 3 wrong answers and 1 correct answer. Each question should include supporting media in Latex format for MathJax library. All answers that are equation based should use MathJax type formatting to be parsed by MathJax library. Do not include any new line characters in the response such as ("\\n") or excessive spacing. Ensure the json complies with parsing, making sure equation backslahes are double. You MUST stick to the schema, do not add key names or modify the object structure.` }
              ],
              model: "gpt-4",
              temperature: 0.4,
              functions: [aiFunction]
          });

          try {
            let parsed = JSON.parse(chatCompletion.choices[0].message.function_call.arguments)
            return res.status(200).json({message: "Questions fetched and parsed", chat: parsed, parsed: true});
          
          } catch (error) {
            if(chatCompletion) {
              return res.status(200).json({message: "Questions fetched but not parsed", chat: chatCompletion.choices[0].message.function_call.arguments, error: error.message, parsed: false});

            } else {
              return res.status(500).json({message: 'failed to get any AI chat data', error: error.message})
            } 
          }



        } else {
            return res.status(400).json({message: 'invalid topic query'})
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
   
});
