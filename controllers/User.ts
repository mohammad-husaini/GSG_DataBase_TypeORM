import express from 'express';
import { User } from '../db/entites/User.js'
import { Profile } from '../db/entites/Profile.js';
import dataSource from '../db/DataSource.js';
import { Role } from '../db/entites/Role.js';
export const createUser = async (req: express.Request, res: express.Response) => {

    try {
        const user = new User()
        const profile = new Profile()
        const role = new Role()
        role.id = req.body.roleId || 4
        user.username = req.body?.username
        user.email = req.body?.email
        user.password = req.body?.password
        user.roles = [role]
        user.profile = profile
        profile.firstName = req.body?.firstName
        profile.lastName = req.body?.lastName
        profile.dateOfBirth = new Date
        dataSource.transaction(async (transactionManager) => {
            await transactionManager.save(profile);
            await transactionManager.save(user);
        }).then(() => {
            res.status(201).send(user);
        }).catch(error => {
            res.status(500).send("Something went wrong: " + error);
        });

    } catch (error) {
        res.status(500).send(error)
    }
}

export const assignRole = async (req: express.Request, res: express.Response) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.body.id
            },
        })
        const role = new Role()
        role.id = req.body.role
        if (user) {
            user.roles = [role]
            await user.save()
        }

        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }

}
export const getUsers = async (req: express.Request, res: express.Response) => {
    try {
        const user = await User.find()
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

