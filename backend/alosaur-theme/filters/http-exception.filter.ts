import {
  AlosaurRequest,
  AlosaurResponse,
  HttpError,
  Inject,
} from "https://deno.land/x/alosaur@v0.35.1/mod.ts";
import { ErrorObj, SsrService } from "../../deno-ssr/mod.ts";
import type { FullThemeConfig } from "../types/index.ts";
import {
  getMessage,
  getStack,
  getStatus,
  handleError,
} from "../error-handler.ts";

@Catch(HttpError, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  log = console;

  constructor(
    @Inject("theme") private theme: FullThemeConfig,
    private ssr: SsrService,
  ) {
  }

  private getErrorObject(
    exception: HttpError | Error,
    req: Request,
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
      path: req.url,
    };

    if (overwriteException) {
      errorObj.before = this.getErrorObject(exception, req);
    }

    return errorObj;
  }

  private async renderErrorPage(
    exception: HttpError,
    host: ArgumentsHost,
    componentTagName: string,
  ) {
    const httpCtx = host.switchToHttp();
    const req = httpCtx.getRequest<AlosaurRequest>();
    let overwriteException: Error | HttpError | undefined;

    const sharedContext = await this.ssr.getSharedContext(
      req,
      this.theme.templateVars,
      this.getErrorObject(exception, req, overwriteException),
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
      this.log.error(`Can't render "${componentTagName}":  ${error}`);
      overwriteException = handleError(error);
    }

    return {
      hasError: true,
      html: "",
      exception: overwriteException,
    };
  }

  async catch(exception: HttpError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<AlosaurResponse>();
    const req = ctx.getRequest<AlosaurRequest>();
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
        host,
        errorPageConfig.component,
      );
      if (result.hasError) {
        overwriteException = result.exception;
        status = overwriteException ? getStatus(overwriteException) : 500;
      } else {
        return res.status(status).send(result.html);
      }
    }

    // Fallback
    res
      .status(status)
      .json(this.getErrorObject(exception, req, overwriteException));
  }
}

export const HttpExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
};
