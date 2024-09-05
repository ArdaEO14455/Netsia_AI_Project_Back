import fetch from "node-fetch";
import dotenv from "dotenv"
import jwt from 'jsonwebtoken';


// loading an env file and setting the environment variables
dotenv.config()

export const getAIResponse = async (newMessage) => {
  try {
    // Generate a JWT token
    const token = jwt.sign(
      { conversationId: newMessage.conversationId }, // Payload data, could include user ID, roles, etc.
      process.env.JWT_SECRET,      // Secret key from environment variables
      { expiresIn: '12h' }          // Token expiry time
    );
    
    // Make a POST request to the AI API with the message content in the body
    const response = await fetch('http://127.0.0.1:5000/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Add JWT to the Authorization header
      },
      body: JSON.stringify({
        question: newMessage.content, // Sending only the message content to the AI API
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch AI response');
    }

    const data = await response.json();
    return data.response; // Assuming the AI API returns { response: "AI's message here" }
  } catch (error) {
    console.error('Error fetching AI response:', error.message);
    return null;
  }
};