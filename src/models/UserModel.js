import mongoose from "mongoose";

//Define Structure of the User Schema including data points, types, and validation
const userSchema = new mongoose.Schema ({
    //user ID will be generated automatically
    username: { type: String, required: true },
    email: {type: String},
    password: {type: String}, //Make sure to encrypt password & create validation)
    conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }]
})

//Create Model based on User Schema
const UserModel = mongoose.model('User', userSchema)

export { UserModel } 