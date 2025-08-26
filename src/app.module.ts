import { Module } from '@nestjs/common';
import { DatabaseModule } from './app/commons/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
 