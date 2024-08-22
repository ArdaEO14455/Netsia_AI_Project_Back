import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import { ConversationModel } from '../models/ConversationModel.js';
import { MessageModel } from '../models/MessageModel.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

// Get the current directory path
const __dirname = dirname(fileURLToPath(import.meta.url));

const messageRouter = Router()

// Function to get the AI response from llama.py
const getAIResponse = async () => {
    return new Promise((resolve, reject) => {
      exec('python3 ./src/llama.py', (error, stdout, stderr) => {
        
        if (error) {
            console.log('error 1')
          reject(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
            onsole.log('error 2')
          reject(`Stderr: ${stderr}`);
          return;
        }
  
        // Parse the JSON output from the Python script
        const result = JSON.stringify(stdout);
        console.log(`result:${result}`)
        resolve(result.response);
      });
    });
  };

// Retrieve all messages in a given conversation
messageRouter.get('/:id', async (req, res) => {
    try {
        const conversation = await ConversationModel.findById(req.params.id).populate('messages');
        if (!conversation) {
            return res.status(404).send({ error: 'Conversation not found' });
        }

        res.status(200).send(conversation.messages);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
//Create Message

messageRouter.post('/:id', async (req, res) => {
    try {
        const conversation = await ConversationModel.findById(req.params.id);
        if (!conversation) {
            return res.status(404).send({ error: 'Conversation not found' });
        }

        const newMessageData = {
            conversationId: req.params.id,
            sender: req.body.sender,
            content: req.body.content,
            timestamp: req.body.timestamp
        };

        const newMessage = await MessageModel.create(newMessageData);

        conversation.messages.push(newMessage._id);
        await conversation.save();

        // Save the new message to a JSON file
        const filePath = path.join(__dirname, 'latest_message.json');
        fs.writeFileSync(filePath, JSON.stringify(newMessage, null, 2));

        // Conditionally call getAIResponse() if the sender is 'user'
        if (newMessage.sender === 'user') {
            getAIResponse();
        }

        res.status(201).send(newMessage);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err.message });
    }
});

export default messageRouter;