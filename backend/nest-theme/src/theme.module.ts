import {
  Module,
  DynamicModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
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
@Module({
  providers: [
    SsrService,
    SsrMiddleware,
    HttpExceptionFilterProvider,
    SourceFileService,
    TemplateFileService,
  ],
  controllers: [],
  exports: [SsrService, SsrMiddleware, SourceFileService],
})
export class ThemeModule {
  constructor(
    protected readonly adapterHost: HttpAdapterHost<ExpressAdapter>,
    protected config: ConfigService,
    protected ssrMiddleware: SsrMiddleware,
  ) {
    this.adapterHost = adapterHost;
    const fullThemeConfig = this.config.get<ThemeConfig>('theme');

    /**
     * Get the application context.
     * @see https://docs.nestjs.com/faq/http-adapter#in-context-strategy
     */
    const express = this.adapterHost.httpAdapter;

    /**
     * Set express options for the template engine, assets path and view dir for the current active theme
     */
    express.setViewEngine(fullThemeConfig.viewEngine);
    express.useStaticAssets(fullThemeConfig.assetsDir, {});
    express.setBaseViewsDir(fullThemeConfig.viewsDir);
  }

  static forRoot(nestThemeConfig: NestThemeConfig): DynamicModule {
    const basePath = resolve(nestThemeConfig.themeDir, 'config');
    const activeThemeConfig = loadConfig<ThemeConfig>([
      resolve(basePath, 'theme.ts'),
      resolve(basePath, 'theme.yaml'),
    ]);

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

    return {
      imports: [
        ConfigModule.forRoot({
          load: [registerAs('theme', () => fullThemeConfig)],
        }),
      ],
      module: ThemeModule,
      providers: [],
      controllers: [],
      exports: [],
    };
  }

  /**
   * Applying middleware, see https://docs.nestjs.com/middleware#applying-middleware
   * @param consumer
   */
  configure(consumer: MiddlewareConsumer) {
    // Dynamic routes
    const theme = this.config.get<ThemeConfig>('theme');
    if (theme.routes) {
      for (const route of theme.routes) {
        for (const path of route.path) {
          consumer
            .apply(SsrMiddleware)
            .forRoutes({ path, method: RequestMethod.GET });
        }
      }
    }
  }
}
