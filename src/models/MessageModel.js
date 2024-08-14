import mongoose from "mongoose";


//Define structure of the message schema including data points, types, and validation
const MessageSchema = new mongoose.Schema ({
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    sender: {type: String, required: true},
    content: {type: String, required: true},
    timestamp: {type: String, required: true}
})


//Create Model based on Message Schema
const MessageModel = mongoose.model('Message', MessageSchema)

export { MessageModel } 