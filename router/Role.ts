import express from 'express';
import { createRole } from '../controllers/Role.js';



const router = express.Router();


router.post('/', createRole)


export default router