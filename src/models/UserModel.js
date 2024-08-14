import mongoose from "mongoose";

//Define Structure of the User Schema including data points, types, and validation
const userSchema = new mongoose.Schema ({
    //user ID will be generated automatically
    username: { type: String, required: true },
    email: {type: String, required: true},
    password: {type: String, required: true} //Make sure to encrypt password & create validation)

})

//Create Model based on User Schema
const UserModel = mongoose.model('User', userSchema)

export { UserModel } 