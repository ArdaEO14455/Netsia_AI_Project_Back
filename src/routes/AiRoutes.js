import fetch from "node-fetch";
import dotenv from "dotenv"



// loading an env file and setting the environment variables
dotenv.config()


export const getAIResponse = async (newMessage) => {
    try {
      console.log(newMessage.content)
      
      // Make a POST request to the AI API with the message content in the body
      const response = await fetch('http://127.0.0.1:5000/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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