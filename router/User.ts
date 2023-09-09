import express from 'express'
import { User } from '../db/entites/User.js'
import { Profile } from '../db/entites/Profile.js'
import dataSource from '../db/DataSource.js'
const router = express.Router()

router.post('/', async (req, res) => {

    try {
        const user = new User()
        const profile = new Profile()
        user.username = req.body?.username
        user.email = req.body?.email
        user.password = req.body?.password
        user.profile = profile
        profile.firstName = req.body?.firstName
        profile.lastName = req.body?.lastName
        profile.dateOfBirth = new Date
        dataSource.transaction(async (transactionManager) => {
            await transactionManager.save(profile);
            await transactionManager.save(user);
        }).then(() => {
            res.send(user);
        }).catch(error => {
            res.status(500).send("Something went wrong: " + error);
        });

    } catch (error) {
        res.status(500).send(error)
    }
})

export default router