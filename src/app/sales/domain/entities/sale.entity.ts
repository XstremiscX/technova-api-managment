import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { UserEntity } from 'src/app/users/domain/entities/user.entity';
import { ISaleEntity } from '../interfaces/isale-entity.interface';

@Entity('sales')
export class SaleEntity implements ISaleEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'timestamp' })
    date: Date;

    @Column({ type: 'int' })
    quantity: number;

    @ManyToOne(() => UserEntity, user => user.id)
    buyer: string;

    @ManyToOne(() => UserEntity, user => user.id)
    seller: string;

    @Column({ type: 'text' })
    details: string;
}