import { Router } from 'express'
import { MessageModel } from '../models/MessageModel.js'
import { ConversationModel } from '../models/ConversationModel.js'

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

messageRouter.post('/:id', async (req, res) => {
    try {
        // Find the conversation by its ID
        const conversation = await ConversationModel.findById(req.params.id);
        if (!conversation) {
            return res.status(404).send({ error: 'Conversation not found' });
        }

        // Include the conversationId in the message data
        const newMessageData = {
            conversationId: req.params.id,
            sender: req.body.sender,
            content: req.body.content,
            timestamp: req.body.timestamp
        };

        // Create the new message
        const newMessage = await MessageModel.create(newMessageData);

        // Add the message ID to the conversation's messages array
        conversation.messages.push(newMessage._id);
        await conversation.save();

        // Send the newly created message as the response
        res.status(201).send(newMessage);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err.message });
    }
});

export default messageRouter