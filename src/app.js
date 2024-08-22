import express from 'express';
import { exec } from 'child_process';
import './db.js';
import userRouter from './routes/user_routes.js';
import messageRouter from './routes/message_routes.js';
import conversationRouter from './routes/conversation_routes.js';
import cors from 'cors';

// Creating an instance of the express app
const app = express();

// Middleware to allow access to the routes
app.use(cors());

// Parsing incoming requests with express.json
app.use(express.json());

// Attaching all the user routes to the application
app.use('/user', userRouter);
app.use('/message', messageRouter);
app.use('/conversation', conversationRouter);

// Function to get the AI response from llama.py
const getAIResponse = () => {
  return new Promise((resolve, reject) => {
    exec('python3 ./src/llama.py', (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`Stderr: ${stderr}`);
        return;
      }

      // Parse the JSON output from the Python script
      const result = JSON.parse(stdout);
      resolve(result.response);
    });
  });
};

// Example route to get the AI response
app.get('/ai-response', async (req, res) => {
  try {
    const response = await getAIResponse();
    res.json({ message: response });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default app;
