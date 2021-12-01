import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as Express from 'express';
import {
  NestExpressApplication,
  ExpressAdapter,
} from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';

import { AppModule } from './app.module';
import * as config from './config/config';

async function bootstrap() {
  const console = new Logger('bootstrap');
  const express = Express();
  const expressAdapter = new ExpressAdapter(express);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule.register(expressAdapter),
    expressAdapter,
    {
      logger: ['error', 'warn', 'debug', 'log'],
    },
  );

  app.enableCors({
    origin: '*', // TODO get all allowed domains from database and change this on runtime if a new shop is installed if possible?
  });

  app.use(cookieParser());

  /**
   * Needed if this app is behind a proxy with secure cookies
   * @see https://github.com/expressjs/session#cookiesecure
   */
  app.set('trust proxy', 1); // trust first proxy

  /**
   * Init express session
   */
  const session = expressSession(config.session);

  /**
   * Set express session
   */
  app.use(session);

  await app.listen(config.app.port);

  console.debug(`Start app on http://localhost:${config.app.port}`);
}
bootstrap();
