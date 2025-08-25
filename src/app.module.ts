import { Module } from '@nestjs/common';
import { DatabaseModule } from './domains/commons/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
 