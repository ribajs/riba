import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { ErrorObj } from '@ribajs/ssr';
import { ConfigService } from '@nestjs/config';
import { SsrService } from '../ssr.service';
import type { FullThemeConfig } from '../types/theme-config';
import { APP_FILTER } from '@nestjs/core';
import { Request, Response } from 'express';
import { getMessage, getStatus, getStack, handleError } from '../error-handler';

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  theme: FullThemeConfig;
  log = new Logger(this.constructor.name);

  constructor(protected config: ConfigService, protected ssr: SsrService) {
    this.theme = this.config.get<FullThemeConfig>('theme');
  }

  protected getErrorObject(exception: HttpException | Error, req: Request) {
    const status = getStatus(exception);
    const message = getMessage(exception);
    const stack = getStack(exception);

    const errorObj: ErrorObj = {
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      stack,
      path: req.url,
    };
    return errorObj;
  }

  protected async renderErrorPage(
    exception: HttpException,
    host: ArgumentsHost,
    componentTagName: string,
  ) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    let overwriteException: Error | HttpException | undefined;

    const sharedContext = await this.ssr.getSharedContext(
      req,
      this.theme.templateVars,
      this.getErrorObject(exception, req),
    );

    try {
      const page = await this.ssr.renderComponent({
        componentTagName,
        sharedContext,
      });
      this.log.debug(`Rendered page component: not-found-page`);
      // this.log.debug(`page: ${page.html}`);
      const html = page.html;
      return {
        hasError: false,
        html,
      };
    } catch (error) {
      this.log.error(error);
      overwriteException = handleError(error);
    }

    return {
      hasError: true,
      html: '',
      exception: overwriteException,
    };
  }

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    let status = getStatus(exception);
    let overwriteException: Error | HttpException | undefined;

    this.log.debug('catch error', JSON.stringify(exception));

    /**
     * Render custom 404 error page
     * @see https://docs.nestjs.com/exception-filters
     */
    if (status === HttpStatus.NOT_FOUND) {
      const result = await this.renderErrorPage(
        exception,
        host,
        'not-found-page',
      );
      if (result.hasError) {
        overwriteException = result.exception;
        status = getStatus(overwriteException);
      } else {
        return res.status(status).send(result.html);
      }
    }

    /**
     * Render custom 500 error page
     * @see https://docs.nestjs.com/exception-filters
     */
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      const result = await this.renderErrorPage(exception, host, 'error-page');
      if (result.hasError) {
        overwriteException = result.exception;
        status = getStatus(overwriteException);
      } else {
        return res.status(status).send(result.html);
      }
    }

    // 500 and others
    res
      .status(status)
      .json(this.getErrorObject(overwriteException || exception, req));
  }
}

export const HttpExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
};
