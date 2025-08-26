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

    @OneToMany(() => UserEntity, userEntity => userEntity.type)
    users: UserEntity[];
}
