import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';

import { appConfig, theme } from './config/config';
import { ThemeModule } from '@ribajs/nest-theme';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    ThemeModule.forRoot(theme),
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
