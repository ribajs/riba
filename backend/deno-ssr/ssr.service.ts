// See https://github.com/ribajs/riba/blob/master/backend/node-ssr/src/ssr.service.ts

import {
  ErrorObj,
  RenderResult,
  RequestContext,
  SharedContext,
  SsrServiceOptions,
  SsrServiceOptionsArg,
  TemplateVars,
} from "./types/index.ts";

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
      ],
      stdout: "piped",
      stderr: "piped",
    });

    const status = await process.status();

    if (!status.success) {
      const output = new TextDecoder().decode(await process.stderrOutput());
      throw new Error(output);
    }
    const output = new TextDecoder().decode(await process.output());
    4;
    let result: RenderResult;
    try {
      result = JSON.parse(output);
    } catch (error) {
      throw new Error(
        `You can not use JSON.parse on ${JSON.stringify(output)}.\n` +
          error?.message,
      );
    }

    return result as RenderResult;
  }
}
