import { Module } from '@nestjs/common';
import { BrandModule } from './app/brands/infrastructure/modules/brand.module';
import { DatabaseModule } from './app/commons/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './app/categories/infrastructure/modules/category.module';
import { UsersModule } from './app/users/infrastructure/modules/users.module';
import { AuthModule } from './app/auth/infrastructure/modules/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailerModule } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';
import { SellerProductsModule } from './app/seller-products/infrastructure/modules/seller-products.module';

dotenv.config()

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    BrandModule, 
    DatabaseModule,
    CategoryModule,
    UsersModule,
    SellerProductsModule,
    AuthModule,
    EventEmitterModule.forRoot(),
    MailerModule.forRoot({
      transport:{
        host:process.env.HOST_NODEMAILER,
        port:587,
        secure:false,
        auth:{
          user:process.env.USER_EMAIL,
          pass: process.env.EMAIL_APP_PASSWORD
        }
      },
      defaults:{
        from: `"Technova" <${process.env.USER_EMAIL}>`
      }
    })
  ],
  controllers: [],
  providers: [],
})  
export class AppModule {}
 