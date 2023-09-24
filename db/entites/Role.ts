import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.js";
import { Permission } from "./Permission.js";

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: string;
    @Column({
        type: 'enum',
        enum: ['admin', 'user', 'editor'],
        default: 'user'
    })
    name: 'admin' | 'user' | 'editor';

    @ManyToMany(() => User, user => user.roles)
    users: User[];

    @ManyToMany(() => Permission, { eager: true })
    @JoinTable()
    permissions: Permission[];


}