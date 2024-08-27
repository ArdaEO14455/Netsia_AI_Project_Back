import express from 'express';
import './db.js';
import userRouter from './routes/user_routes.js';
import messageRouter from './routes/message_routes.js';
import conversationRouter from './routes/conversation_routes.js';
import cors from 'cors';

// Creating an instance of the express app
const app = express();

// Middleware to allow access to the routes
app.use(cors());

// Parsing incoming requests with express.json
app.use(express.json());

// Attaching all the user routes to the application
app.use('/user', userRouter);
app.use('/message', messageRouter);
app.use('/conversation', conversationRouter);



export default app;
