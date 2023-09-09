import { DataSource } from 'typeorm';
import { User } from './entites/User.js'
import { Profile } from './entites/Profile.js';
import { Permission } from './entites/Permission.js';
import { Role } from './entites/Role.js';

const dataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.USER_NAME,
    password: "",
    database: "GSG_DATABASE",
    entities: [User, Role, Profile, Permission],
    logging: true,
    synchronize: true
});

export default dataSource