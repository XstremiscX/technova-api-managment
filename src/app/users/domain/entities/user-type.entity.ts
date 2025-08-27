import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import { ITypeEntity } from '../interfaces/itype-entity.interface';
import { UserEntity } from './user.entity';

@Entity('user_types')
export class UserTypeEntity implements ITypeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column({ type: 'text' })
    description: string;

    // This statement creates the relationship between the users table and the user types table.
    @OneToMany(() => UserEntity, userEntity => userEntity.type)
    users: UserEntity[];
}
