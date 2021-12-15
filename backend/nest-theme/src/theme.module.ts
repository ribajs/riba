import {
  Module,
  DynamicModule,
  MiddlewareConsumer,
  RequestMethod,
  CacheModule,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ConfigModule, registerAs, ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';

import { SsrService } from './ssr.service';
import { SsrMiddleware } from './ssr.middleware';
import { EmptyTemplateVars } from './empty-template-vars';
import type { ThemeConfig } from '@ribajs/ssr';
import { HttpExceptionFilterProvider } from './filters/http-exception.filter';

import type { NestThemeConfig, FullThemeConfig } from './types';
import {
  loadConfig,
  validateThemeConfig,
  validateNestThemeConfig,
  validateFullThemeConfig,
} from './helper/config';
import { resolve } from 'path';
import { SourceFileService } from './source-file/source-file.service';
import { TemplateFileService } from './template-file/template-file.service';
import { RefreshCacheService } from './refresh-cache/refresh-cache.service';
@Module({
  providers: [
    SsrService,
    SsrMiddleware,
    HttpExceptionFilterProvider,
    SourceFileService,
    TemplateFileService,
    RefreshCacheService,
    HttpAdapterHost,
  ],
  controllers: [],
  imports: [],
  exports: [SsrService, SsrMiddleware, SourceFileService, RefreshCacheService],
})
export class ThemeModule {
  constructor(private config: ConfigService) {}

  static async register(
    nestThemeConfig: NestThemeConfig,
    expressAdapter: ExpressAdapter,
    env = process.env.NODE_ENV || 'development',
  ): Promise<DynamicModule> {
    const basePath = resolve(nestThemeConfig.themeDir, 'config');
    const activeThemeConfig = await loadConfig<ThemeConfig>(
      [
        resolve(basePath, 'theme.js'),
        resolve(basePath, 'theme.ts'),
        resolve(basePath, 'theme.yaml'),
      ],
      env,
    );

    validateThemeConfig(activeThemeConfig);
    validateNestThemeConfig(nestThemeConfig);

    const fullThemeConfig: FullThemeConfig = {
      ...activeThemeConfig,
      ...nestThemeConfig,
      basePath,
      templateVars: nestThemeConfig.templateVars || new EmptyTemplateVars(),
      assetsDir: resolve(nestThemeConfig.themeDir, activeThemeConfig.assetsDir),
      viewsDir: resolve(nestThemeConfig.themeDir, activeThemeConfig.viewsDir),
      pageComponentsDir: resolve(
        nestThemeConfig.themeDir,
        activeThemeConfig.pageComponentsDir || '',
      ),
    };

    validateFullThemeConfig(fullThemeConfig);

    const cacheModule = CacheModule.register();

    /**
     * Set express options for the template engine, assets path and view dir for the current active theme
     */
    expressAdapter.setViewEngine(fullThemeConfig.viewEngine);
    expressAdapter.useStaticAssets(fullThemeConfig.assetsDir, {});
    expressAdapter.setBaseViewsDir(fullThemeConfig.viewsDir);

    return {
      imports: [
        ConfigModule.forRoot({
          load: [registerAs('theme', () => fullThemeConfig)],
        }),
        cacheModule,
      ],
      module: ThemeModule,
      providers: [],
      controllers: [],
      exports: [cacheModule],
    };
  }

  /**
   * Applying middleware, see https://docs.nestjs.com/middleware#applying-middleware
   * @param consumer
   */
  configure(consumer: MiddlewareConsumer) {
    // Dynamic routes
    const theme = this.config.get<ThemeConfig>('theme');
    if (!theme) {
      throw new Error('Theme config not defined!');
    }
    const paths: { path: string; method: RequestMethod }[] = [];
    if (theme.routes) {
      for (const route of theme.routes) {
        for (const path of route.path) {
          paths.push({ path, method: RequestMethod.GET });
        }
      }
    }

    consumer.apply(SsrMiddleware).forRoutes(...paths);
  }
}
