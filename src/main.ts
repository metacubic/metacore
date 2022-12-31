import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { join } from 'path';
import { setupMedia } from './config/media/media.config';
import { setupConsole } from './config/console/console.config';
import { setupSwagger } from './config/swagger/swagger.config';
import { setupDiscord } from './config/discord/discord.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: ['error', 'warn', 'debug'],
    cors: true,
  });
  const globalPrefix = 'v1';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3001;
  app.use(cookieParser());
  app.use(compression());
  app.useStaticAssets(join(__dirname, '..', 'client/assets'));
  app.setBaseViewsDir(join(__dirname, '..', 'client'));
  app.setViewEngine('ejs');

  // ----| [ CONNECTION ] |----
  // setupMedia(app);
  setupConsole(app);
  setupSwagger(app);
  // setupDiscord(app);
  await app.listen(port);
}

void bootstrap();
