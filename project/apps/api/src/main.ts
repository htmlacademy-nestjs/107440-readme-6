/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { RequestIdInterceptor } from '@project/interceptors';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new RequestIdInterceptor());

  const configService = app.get(ConfigService);
  const port = configService.get('apiGateway.port');

  const config = new DocumentBuilder()
    .setTitle('The <APIGatwway> service')
    .setDescription('APIGatwway service API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec/apiGateway', app, document);

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
