import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { API_PREFIX, PORT } from './shared/constants';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.setGlobalPrefix(API_PREFIX);
  app.use(cookieParser());

  app.use(
      session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
      }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  initSwagger(app);  

  await app.listen(PORT);
}

function initSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Beauty Saloon Api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${API_PREFIX}/swagger`, app, document);
}

bootstrap();
