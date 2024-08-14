import mongoose from "mongoose";


//Define structure of the conversation schema including data points, types, and validation
const conversationSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subject: { type: String, required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], // Array of message IDs
    timeCreated: { type: String, required: true }
});

// Create Model based on Conversation Schema
const ConversationModel = mongoose.model('Conversation', conversationSchema);

export { ConversationModel };