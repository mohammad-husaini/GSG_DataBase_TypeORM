import express from 'express'
import { assignRole, createUser, getUsers } from '../controllers/User.js'
const router = express.Router()

router.get('/', getUsers)
router.post('/', createUser)
router.put('/', assignRole)


export default router