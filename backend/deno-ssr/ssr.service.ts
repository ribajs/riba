// See https://github.com/ribajs/riba/blob/master/backend/node-ssr/src/ssr.service.ts

import {
  ConsoleMessage,
  ErrorObj,
  RenderError,
  RenderResult,
  RequestContext,
  SharedContext,
  SsrServiceOptions,
  SsrServiceOptionsArg,
  TemplateVars,
} from "./types/index.ts";

import { toJsonString } from "./utils.ts";

export class SsrService {
  log = console;

  private options: SsrServiceOptions;

  constructor(options: SsrServiceOptionsArg) {
    options.defaultRootTag = options.defaultRootTag || "ssr-root-page";
    options.defaultTemplateFile = options.defaultTemplateFile ||
      "page-component.pug";
    options.defaultTemplateEngine = options.defaultTemplateEngine || "pug";

    if (!options.sourceFileDir) {
      throw new Error("[SsrService] The sourceFileDir option is required!");
    }
    if (!options.templateDir) {
      throw new Error("[SsrService] The templateDir option is required!");
    }

    this.options = options as SsrServiceOptions;
  }

  getSharedContext(
    req: Partial<RequestContext> = {},
    templateVars: TemplateVars = {},
    errorObj?: ErrorObj,
  ) {
    const sharedContext: SharedContext = {
      ctx: {
        hostname: req.hostname,
        method: req.method,
        params: req.params,
        protocol: req.protocol,
        query: req.query,
        path: req.path,
        errorObj: errorObj,
        status: errorObj?.statusCode || req.status || 200,
      },
      env: Deno.env.toObject(),
      templateVars,
    };
    return sharedContext;
  }

  async renderComponent({
    componentTagName,
    sharedContext,
    templateEngine = this.options.defaultTemplateEngine,
    templateFile = this.options.defaultTemplateFile,
    rootTag = this.options.defaultRootTag,
  }: {
    templateFile?: string;
    rootTag?: string;
    templateEngine?: string;
    componentTagName: string;
    sharedContext?: SharedContext;
  }): Promise<RenderResult> {
    sharedContext = sharedContext || this.getSharedContext();

    const sourceFileDir = this.options.sourceFileDir;
    const templateDir = this.options.templateDir;

    const process = Deno.run({
      cmd: [
        "yarn",
        "ssr",
        "--root-tag",
        rootTag,
        "--component",
        componentTagName,
        "--engine",
        templateEngine,
        "--template-file",
        templateFile,
        "--source-file-dir",
        sourceFileDir,
        "--template-dir",
        templateDir,
        "--template-vars-json",
        toJsonString(sharedContext.templateVars || {}),
        "--request-json",
        toJsonString(sharedContext.ctx || {}),
        "--console-output",
        "store",
      ],
      stdout: "piped",
      stderr: "piped",
    });

    const status = await process.status();

    if (!status.success) {
      const stderr = new TextDecoder().decode(await process.stderrOutput());
      const stdin = new TextDecoder().decode(await process.output());
      if (stderr) {
        this.log.error("[SsrService] stderr", stderr);
      }
      if (stdin) {
        this.log.log("[SsrService] stdin", stdin);
      }
      throw new Error(stderr);
    }
    const output = new TextDecoder().decode(await process.output());
    const stderr = new TextDecoder().decode(await process.stderrOutput());

    if (stderr) {
      this.log.error("[SsrService] stderr", stderr);
    }

    let result: RenderResult | RenderError;
    try {
      result = JSON.parse(output);
    } catch (error) {
      throw new Error(
        `You can not use JSON.parse on ${JSON.stringify(output)}.\n` +
          error?.message,
      );
    }
    if ((result as RenderError).hasError) {
      throw result as RenderError;
    }
    return result as RenderResult;
  }

  /**
   * Log stored console logs from SSR script
   * @param logs
   */
  public logOutput(logs: ConsoleMessage[]) {
    if (logs?.length) {
      this.log.log("[SsrService] Console output:");
      for (const log of logs) {
        this.log[log.type](log.message, ...(log.optionalParams || []));
      }
    }
  }

  public logToErrorMessage(logs: ConsoleMessage[]) {
    logs = logs.filter((log) => log.type === "error" || log.type === "warn");
    return logs
      .map((log) => {
        return JSON.stringify(log);
      })
      .join("\n");
  }
}
