import express from 'express';
import openai from '../utils/openaiClient.js';

const router = express.Router();
// List of common car brands for better detection
const carBrands = [
    'bmw', 'mercedes', 'audi', 'toyota', 'honda', 'ford', 'chevrolet', 
    'volkswagen', 'hyundai', 'kia', 'nissan', 'tesla', 'porsche', 'ferrari',
    'lamborghini', 'lexus', 'subaru', 'mazda', 'volvo', 'jaguar', 'land rover'
  ];
  
  router.post("/ai-chat", async (req, res) => {
      const { message } = req.body;
    
      try {
        // Enhanced car-related check
        const isCarRelated = 
          /car|vehicle|auto|tire|engine|brake|transmission|mileage|fuel|electric|hybrid|maintenance|oil change|battery|charging|safety|crash|rating|buy|purchase|model|make|brand|specs|feature|price|cost|mpg|horsepower|torque/i.test(message.toLowerCase()) ||
          carBrands.some(brand => message.toLowerCase().includes(brand));
    
        if (!isCarRelated) {
          return res.status(200).json({ 
            response: "Sorry, I can only help with car-related questions. Try asking about specific car brands, models, or maintenance topics." 
          });
        }
    
        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are an expert car assistant with knowledge about all car brands and models. 
              Respond to questions about any car manufacturer, model, specifications, features, or maintenance.
              
              For brand-specific questions (like BMW, Toyota, etc.):
              - Provide a brief overview of the brand
              - Mention popular models
              - Highlight key technologies or features
              - Keep response concise (3-5 sentences)
              
              For other car questions, provide helpful, technical but understandable answers.`,
            },
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 300,
        });
    
        res.status(200).json({ response: completion.choices[0].message.content });
      } catch (error) {
        console.error("AI Car Chatbot Error:", error.message);
        res.status(500).json({ error: "Something went wrong while processing your car question." });
      }
  });

export default router;