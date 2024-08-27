import fetch from "node-fetch";

export const getAIResponse = async (newMessage) => {
    try {
      // Make a POST request to the AI API with the message content in the body
      const response = await fetch('http://localhost:6000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          content: newMessage.content, // Sending only the message content to the AI API
        },
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