import { Module, DynamicModule } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ConfigService, ConfigModule } from '@nestjs/config';

import { appConfig, theme } from './config/config';
import { ThemeModule } from '@ribajs/nest-theme';

@Module({})
export class AppModule {
  static register(expressAdapter: ExpressAdapter): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          load: [appConfig],
        }),
        ThemeModule.register(theme, expressAdapter),
      ],
      controllers: [],
      providers: [ConfigService],
    };
  }
}
