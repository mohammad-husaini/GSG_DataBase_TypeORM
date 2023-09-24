import express from 'express'
import { Permission } from '../db/entites/Permission.js'


export const CreatePermission = async (req: express.Request, res: express.Response) => {
    try {
        const permission = new Permission()
        permission.name = req?.body.name
        await permission.save()
        res.status(201).send(permission)
    } catch (error) {
        res.status(500).send(error)
    }

}