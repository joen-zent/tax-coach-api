import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';
import * as express from 'express';
import { Express } from 'express';

const expressApp: Express = express();
let isInitialized = false;

async function bootstrap(): Promise<Express> {
  if (!isInitialized) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), {
      logger: false,
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors();

    const config = new DocumentBuilder()
      .setTitle('Tax Coach API')
      .setDescription('연말정산 컨설팅 API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.init();
    isInitialized = true;
  }
  return expressApp;
}

export default async (req: express.Request, res: express.Response) => {
  const server = await bootstrap();
  server(req, res);
};
