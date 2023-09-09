import express from 'express'
import { Permission } from '../db/entites/Permission.js'
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const permission = new Permission()
        permission.name = req?.body.name
        await permission.save()
        res.status(200).send(permission)
    } catch (error) {
        res.status(500).send(error)
    }

})

export default router