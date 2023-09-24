import express from 'express';
import { Role } from '../db/entites/Role.js';
import { Permission } from '../db/entites/Permission.js';
import { In } from 'typeorm';
export const createRole = async (req: express.Request, res: express.Response) => {
    try {
        const role = new Role
        role.name = req.body.name;
        role.permissions = await Permission.findBy({
            id: In(req.body.permissions)
        })
        await role.save();
        res.status(201).send(role)

    } catch (error) {
        res.status(404).send(error)
    }

}