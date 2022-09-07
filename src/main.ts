import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = new ConfigService().get<string>('PORT') || 4000;
  await app.listen(port);
}
bootstrap();
