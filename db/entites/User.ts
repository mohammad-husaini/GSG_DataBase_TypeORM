import { BaseEntity, BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile.js";
import bcrypt from "bcrypt";

import { Role } from "./Role.js";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;
    user: Role;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10)
        }
    }

    @Column({ nullable: false })
    password: string;

    @Column()
    email: string;

    @OneToOne(() => Profile, { eager: true })
    @JoinColumn()
    profile: Profile;

    @ManyToMany(() => Role, role => role.users, { eager: true, cascade: true })
    @JoinTable()
    roles: Role[];


}