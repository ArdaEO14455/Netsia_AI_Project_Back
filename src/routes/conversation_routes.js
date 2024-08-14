import { Router } from 'express'
import { ConversationModel } from '../models/ConversationModel.js'

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
conversationRouter.post('/', async (req, res) => {
    try {
        const newConversation = await ConversationModel.create(req.body);
        const user = await UserModel.findById(newConversation.user);
        user.conversations.push(newConversation._id);
        await user.save();

        res.status(201).send(newConversation);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

export { conversationRouter };

export default conversationRouter