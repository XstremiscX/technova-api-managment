import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports:[
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST || "localhost",
            port: parseInt(process.env.DB_PORT || "5432"),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities:[__dirname+'/**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
            synchronize: false,
            autoLoadEntities: true,
        })
    ]
})
export class DatabaseModule {}
