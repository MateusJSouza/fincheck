import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { env } from './shared/config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [env.feDevURL, env.feProdURL],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT ? Number(process.env.PORT) : 3333;

  await app.listen(port, '0.0.0.0').then(() => {
    console.log(`🚀 HTTP Server running at -> ${port}`);
  });
}
bootstrap();
