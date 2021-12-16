import { ErrorObj, SsrService } from "../../deno-ssr/mod.ts";
import type { FullThemeConfig } from "../types/index.ts";
import { Request, Response } from "express";
import {
  getMessage,
  getStack,
  getStatus,
  handleError,
} from "../error-handler.ts";

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  theme: FullThemeConfig;
  log = new Logger(this.constructor.name);

  constructor(private config: ConfigService, private ssr: SsrService) {
    const theme = this.config.get<FullThemeConfig>("theme");
    if (!theme) {
      throw new Error("Theme config not defined!");
    }
    this.theme = theme;
  }

  private getErrorObject(
    exception: HttpException | Error,
    req: Request,
    overwriteException?: HttpException | Error,
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
    exception: HttpException,
    host: ArgumentsHost,
    componentTagName: string,
  ) {
    const httpCtx = host.switchToHttp();
    const req = httpCtx.getRequest<Request>();
    let overwriteException: Error | HttpException | undefined;

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

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    let status = getStatus(exception);
    let overwriteException: Error | HttpException | undefined;

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
