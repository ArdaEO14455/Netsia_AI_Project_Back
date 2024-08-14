import { Router } from 'express'
import { UserModel } from '../models/UserModel.js'

const router = Router()

//Retrieve All Users
router.get('/', async (req, res) => res.send(await UserModel.find()))


//Create User

router.post('/', async (req, res) => {
    try {
        const newUser = await UserModel.create(req.body)
        res.status(201).send(newUser)
    }

    catch(err) {
        res.status(500).send({ error: err.message })
    }
})

export default router