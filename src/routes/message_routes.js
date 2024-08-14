import { Router } from 'express'
import { MessageModel } from '../models/MessageModel.js'
import { ConversationModel } from '../models/ConversationModel.js'

const messageRouter = Router()

// Retrieve all messages in a given conversation
messageRouter.get('/:conversationId', async (req, res) => {
    try {
        const conversation = await ConversationModel.findById(req.params.conversationId).populate('messages');
        if (!conversation) {
            return res.status(404).send({ error: 'Conversation not found' });
        }

        res.status(200).send(conversation.messages);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
//Create Message

messageRouter.post('/:conversationId', async (req, res) => {
    try {
        const conversation = await ConversationModel.findById(req.params.conversationId);
        if (!conversation) {
            return res.status(404).send({ error: 'Conversation not found' });
        }

        const newMessage = await MessageModel.create(req.body);
        conversation.messages.push(newMessage._id);
        await conversation.save();

        res.status(201).send(newMessage);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

export default messageRouter