import { Router } from 'express';
import { ConversationModel } from '../models/ConversationModel.js';
import { MessageModel } from '../models/MessageModel.js';
import { getAIResponse } from './ai_routes.js';

const messageRouter = Router()

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

// Create a new message in a conversation
messageRouter.post('/:id', async (req, res) => {
    try {
      const conversation = await ConversationModel.findById(req.params.id);
      if (!conversation) {
        return res.status(404).send({ error: 'Conversation not found' });
      }
      //store new message data
      const newMessageData = {
        conversationId: req.params.id,
        sender: req.body.sender,
        content: req.body.content,
        timestamp: req.body.timestamp,
      };
      //Create & Save message in DB
      const newMessage = await MessageModel.create(newMessageData);
  
      conversation.messages.push(newMessage._id);
      await conversation.save();
  
      // If the message is from the user, fetch the AI response
      if (newMessage.sender === 'user') {
        const aiResponseContent = await getAIResponse(newMessage);
        if (aiResponseContent) {
          // Create a new message for the AI response
          const aiMessageData = {
            conversationId: req.params.id,
            sender: 'chatgpt',
            content: aiResponseContent,
            timestamp: 'test-time',
          };
  
          const aiMessage = await MessageModel.create(aiMessageData);
  
          conversation.messages.push(aiMessage._id);
          await conversation.save();
        }
      }
  
      res.status(201).send(newMessage);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    }
  });
  
  export default messageRouter;