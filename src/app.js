import express from 'express'
import './db.js'
import router from './routes/user_routes.js'
import cors from 'cors'

// creating an instance of the express app
const app = express()

// middleware to allow access to the routes
app.use(cors())

// parsing incoming requests with express.json
app.use(express.json())

// attaching all the user routes to the application
app.use('/user', router)

export default app