import { Router } from 'express'
import { ConversationModel } from '../models/ConversationModel.js'
import { UserModel } from '../models/UserModel.js';
import { MessageModel } from '../models/MessageModel.js';
import authMiddleware from '../middleware/authMiddleware.js';

const conversationRouter = Router()

conversationRouter.use('/', authMiddleware);

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

// Route to rename a conversation
conversationRouter.patch('/:conversationId', async (req, res) => {
    try {
        // Extract the conversationId from the route parameter
        const { conversationId } = req.params;

        // Extract the new subject from the request body
        const subject = req.body.subject;
        console.log(subject)

        // Find the conversation by ID and update the subject
        const updatedConversation = await ConversationModel.findByIdAndUpdate(
            conversationId,
            { subject },
            { new: true, runValidators: true } // Return the updated document and run any validators
        );

        if (!updatedConversation) {
            return res.status(404).send({ error: 'Conversation not found' });
        }

        res.status(200).send(updatedConversation);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
});




conversationRouter.delete('/:id', async (req, res) => {
    try {
      // deleteOne to delete an object with a specified id 
      await ConversationModel.deleteOne({ _id: req.params.id })
      //Find & Delete messages that hold the conversationId of the deleted conversation
      await MessageModel.deleteMany({conversationId: req.params.id})
        res.sendStatus(200)
      }
    catch(err) {
      res.status(500).send({ error: err.message })
    }
  })



export default conversationRouter