import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';

import { moduleConfig } from './config';
import { ThemeModule } from './theme/theme.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [moduleConfig],
    }),
    ThemeModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
