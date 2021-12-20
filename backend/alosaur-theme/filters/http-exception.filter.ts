import {
  AlosaurRequest,
  AutoInjectable,
  ErrorObj,
  HttpContext,
  HttpError,
  Inject,
} from "../deps.ts";
import { SsrService } from "../ssr.service.ts";
import type { FullThemeConfig, HttpExceptionCatch } from "../types/index.ts";
import {
  getMessage,
  getStack,
  getStatus,
  handleError,
} from "../error-handler.ts";

/**
 * Renders errors on Theme Error page
 */
@AutoInjectable()
export class HttpExceptionFilter {
  log = console;

  constructor(
    @Inject("theme") private theme: FullThemeConfig,
    private ssr: SsrService,
  ) {
  }

  private getErrorObject(
    exception: HttpError | Error,
    req: AlosaurRequest,
    overwriteException?: HttpError | Error,
  ) {
    const status = getStatus(overwriteException || exception);
    const message = getMessage(overwriteException || exception);
    const stack = getStack(overwriteException || exception);

    const errorObj: ErrorObj = {
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      stack,
      path: req.parserUrl.pathname,
    };

    if (overwriteException) {
      errorObj.before = this.getErrorObject(exception, req);
    }

    return errorObj;
  }

  private async renderErrorPage(
    exception: HttpError,
    httpCtx: HttpContext,
    componentTagName: string,
  ): Promise<HttpExceptionCatch> {
    const req = httpCtx.request;
    let overwriteException: Error | HttpError | undefined;

    const sharedContext = await this.ssr.getSharedContext(
      req,
      this.theme.templateVars,
      this.getErrorObject(exception, req, overwriteException),
    );

    try {
      const renderResult = await this.ssr.renderComponent({
        componentTagName,
        sharedContext,
      });
      this.log.debug(`Rendered page component: ${componentTagName}`);
      // this.log.debug(`page: ${page.html}`);
      return {
        hasError: false,
        renderResult,
      };
    } catch (error) {
      this.log.error(`Can't render "${componentTagName}":  ${error}`);
      overwriteException = handleError(error);
    }

    return {
      hasError: true,
      exception,
      overwriteException,
    };
  }

  async catch(
    exception: HttpError,
    httpCtx: HttpContext,
  ) {
    const req = httpCtx.request;
    let status = getStatus(exception);
    let overwriteException: Error | HttpError | undefined;

    this.log.debug("catch error: " + JSON.stringify(exception));

    /**
     * Render custom status error page
     * - Gets error page component name from theme config
     * @see https://docs.nestjs.com/exception-filters
     */
    const errorPageConfig = this.theme.errorRoutes[status];
    if (errorPageConfig) {
      const result = await this.renderErrorPage(
        exception,
        httpCtx,
        errorPageConfig.component,
      );
      if (!result.hasError) {
        return this.send(httpCtx, {
          status,
          ...result,
        });
      }

      overwriteException = result.exception;
      status = overwriteException ? getStatus(overwriteException) : status;
    }

    // Error on rendering error page
    return this.send(httpCtx, {
      hasError: true,
      status,
      errorObj: this.getErrorObject(exception, req, overwriteException),
    });
  }

  /**
   * Rendered SSR Page response
   */
  private send(context: HttpContext, exception: HttpExceptionCatch) {
    context.response.status = exception.status || 500;

    if (exception.renderResult) {
      context.response.body = exception.renderResult.html;
      context.response.headers.set("Content-Type", "text/html");
      return;
    }

    // Error on rendering error page
    if (exception.hasError) {
      console.debug("Error on rendering error page", exception);
      context.response.body = JSON.stringify(exception.errorObj);
      context.response.headers.set("Content-Type", "application/json");
      return;
    }
  }
}
