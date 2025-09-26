import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { UserEntity } from 'src/app/users/domain/entities/user.entity';
import { Type } from 'class-transformer';

@Entity('sales')
export class SaleEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'timestamp' })
    date: Date;

    @Column({ type: 'int' })
    quantity: number;

    @ManyToOne(() => UserEntity, user => user.purchases)
    buyer: UserEntity;

    @ManyToOne(() => UserEntity, user => user.sales)
    seller: UserEntity;

    @Column({ type: 'text' })
    details: string;

}