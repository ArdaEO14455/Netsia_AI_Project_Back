import { Router } from 'express'
import { ConversationModel } from '../models/ConversationModel.js'
import { UserModel } from '../models/UserModel.js';

const conversationRouter = Router()

// Retrieve all conversations for a given user by user ID
conversationRouter.get('/:userId', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId).populate('conversations');
        if (user) {
            res.status(200).send(user.conversations);
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Create a new conversation
conversationRouter.post('/:userId', async (req, res) => {
    try {
        // Extract the userId from the route parameter
        const { userId } = req.params;

        // Create the conversation with the userId included in the body
        const newConversation = await ConversationModel.create({
            ...req.body,
            userId,
        });

        // Find the user and update their conversations array
        const user = await UserModel.findById(userId);
        user.conversations.push(newConversation._id);
        await user.save();

        res.status(201).send(newConversation);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
});



export default conversationRouter