import mongoose from "mongoose";


//Define structure of the conversation schema including data points, types, and validation
const ConversationSchema = new mongoose.Schema ({
    //conversation ID will be created automatically
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    messages: {type: Array, required: false},
    timeCreated: {type: String, required: true}

})

//Create Model based on Conversation Schema
const ConversationModel = mongoose.model('Conversation', ConversationSchema)

export { ConversationModel } 