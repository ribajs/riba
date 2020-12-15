import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';

import { appConfig, themeConfig } from './config/config';
import { ThemeModule } from './theme/theme.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, themeConfig],
    }),
    ThemeModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
