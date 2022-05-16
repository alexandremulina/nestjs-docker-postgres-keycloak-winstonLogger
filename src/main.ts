import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { winstonConfig } from './utils/winston-config';

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { cors: true, logger });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  console.log('PORT :4000');
  await app.listen(4000);
}
bootstrap();
