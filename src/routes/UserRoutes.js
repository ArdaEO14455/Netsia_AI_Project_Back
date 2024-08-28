import { Router } from 'express';
import { UserModel } from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userRouter = Router();

// Apply authMiddleware to protect all routes except the registration route


// Route to create a new user (Registration)
userRouter.post('/', async (req, res) => {
    console.log('New User Received by Router')
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new UserModel({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();
        console.log('user saved successfully')

        // Create a JWT token for the user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Return the token and user data (excluding the password)
        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
        console.log('Token Sent')
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default userRouter;
