import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { mkdirSync } from 'fs';
import { AllExceptionsFilter } from './app/commons/error_management/all-exceptions.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle("Technova API management")
    .setDescription("This project is a Restful API designed for managing users, products, sales and purchases, handling logins and authentication with JWT, and automated email delivery.")
    .setVersion("0.1")
    .addBearerAuth()
    .build()

  const apiDocument = SwaggerModule.createDocument(app, config);

  const docsPath = resolve(__dirname, '..', 'documentation');

  if (!existsSync(docsPath)) {
    mkdirSync(docsPath);
  }

  SwaggerModule.setup('docs',app,apiDocument);

  writeFileSync(`${docsPath}/openApi.json`,JSON.stringify(apiDocument));
  
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(parseInt(process.env.PORT || "3001"));
}
bootstrap();
