import express from 'express'
import { CreatePermission } from '../controllers/Permission.js'
const router = express.Router()

router.post('/', CreatePermission)

export default router