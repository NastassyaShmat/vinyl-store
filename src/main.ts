import { NestFactory } from '@nestjs/core';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './exception-filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.use(passport.initialize());
  app.use(cookieParser(configService.get<string>('JWT_SECRET')));

  const config = new DocumentBuilder()
    .setTitle('Vinyl Store')
    .setDescription('The Vinyl Store API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('records')
    .addTag('comments')
    .addTag('ratings')
    .addTag('order-items')
    .addTag('files')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
