import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel.js';
import dotenv from "dotenv"


const authRouter = Router();

// loading an env file and setting the environment variables
dotenv.config()

// Login Route
authRouter.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const userId = user._id
        console.log('Login Successful')
        res.status(201).json({
            token,
            userId
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Logout Route
authRouter.post('/logout', async (req, res) => {
    try {
        res.status(200).json({ msg: 'Logout successful. Token should be removed from client storage.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



export default authRouter;
