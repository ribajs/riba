import { Context } from "vm";
import type {
  ComponentLifecycleEventData,
  ErrorObj,
  RequestContext,
} from "@ribajs/ssr";
import { EventDispatcher } from "@ribajs/events";
import { SourceFileService } from "./source-file.service";
import { TemplateFileService } from "./template-file.service";
import { StoreConsole } from "./store-console";
import { createDomForLayout } from "./dom";
import type {
  TemplateVars,
  ResponseError,
  RenderResult,
  SourceFile,
  SsrServiceOptions,
  SsrServiceOptionsArg,
  SharedContext,
  OutputType,
  ConsoleMessage,
} from "./types/index";

export class SsrService {
  log = console;
  private sourceFile: SourceFileService;
  private templateFile: TemplateFileService;
  private options: SsrServiceOptions;
  constructor(options: SsrServiceOptionsArg) {
    options.defaultRootTag = options.defaultRootTag || "ssr-root-page";
    options.defaultTemplateFile =
      options.defaultTemplateFile || "page-component.pug";
    options.defaultTemplateEngine = options.defaultTemplateEngine || "pug";

    if (!options.sourceFileDir) {
      throw new Error("[SsrService] The sourceFileDir option is required!");
    }
    if (!options.templateDir) {
      throw new Error("[SsrService] The templateDir option is required!");
    }
    this.options = options as SsrServiceOptions;
    this.sourceFile = new SourceFileService(options.sourceFileDir);
    this.templateFile = new TemplateFileService(
      options.templateDir,
      options.defaultTemplateEngine
    );
  }

  async getSharedContext(
    req: Partial<RequestContext> = {},
    templateVars: TemplateVars = {},
    errorObj?: ErrorObj
  ) {
    const sharedContext: SharedContext = {
      events: new EventDispatcher(),
      ctx: {
        ...req,
        errorObj: req.errorObj || errorObj,
        status: errorObj?.statusCode || req?.status || 200,
      },
      env: process.env as { [key: string]: string },
      templateVars,
    };
    return sharedContext;
  }

  /**
   * Start ssr using jsdom
   * @see https://github.com/jsdom/jsdom
   *
   * @param layout
   * @param componentTagName
   * @param sharedContext Shared context injected to window object of the fake browser environment
   */
  async render(
    layout: string,
    sharedContext?: SharedContext,
    scriptFilenames = ["main.bundle.js"],
    output: OutputType = "pipe"
  ) {
    sharedContext = sharedContext || (await this.getSharedContext());

    if (!sharedContext?.events) {
      sharedContext.events = new EventDispatcher();
    }

    const { dom, virtualConsole, pipeToConsole } = await createDomForLayout(
      layout,
      output
    );

    if (!dom) {
      throw new Error("Dom not defined!");
    }
    dom.window.ssr = sharedContext;

    let files: SourceFile[] | null = await this.sourceFile.loads(
      scriptFilenames
    );
    let vmContext: Context | null = dom.getInternalVMContext();

    for (const file of files || []) {
      try {
        await file.script.runInContext(vmContext, {
          timeout: this.options.timeout || 5000,
        });
      } catch (error) {
        this.log.error("Error on run script");
        this.log.error(error);
        throw error;
      }
    }

    const renderResult = new Promise<RenderResult>((resolve, reject) => {
      const onError = (error: Error | ErrorEvent) => {
        this.log.error("SSR error");

        const output: ConsoleMessage[] = [];

        if (pipeToConsole.type === "store") {
          output.push(...(pipeToConsole as StoreConsole).messages);
        }

        reject(this.transformBrowserError(error, output));
        clear();
        return true;
      };

      const onDone = (lifecycleEventData: ComponentLifecycleEventData) => {
        if (!dom) {
          throw new Error("Dom is not defined!");
        }
        const html = dom.serialize();
        const result: RenderResult = {
          ...lifecycleEventData,
          html: html,
          css: [],
        };

        if (output === "store" && pipeToConsole.type === "store") {
          result.output = (pipeToConsole as StoreConsole).messages;
        }

        resolve(result);
        clear();
        return;
      };

      const clear = () => {
        // Ignore clear errors
        virtualConsole?.off("jsdomError", onError);

        if (!sharedContext?.events) {
          throw new Error("events are required in sharedContext object!");
        }

        sharedContext?.events?.off("error", onError, this);
        sharedContext?.events?.off("ready", onDone, this);

        if (typeof dom?.window?.removeEventListener === "function") {
          dom.window.removeEventListener("error", onError);
        }

        if (
          typeof dom?.window?.dispatchEvent === "function" &&
          dom.window.Event
        ) {
          dom.window.dispatchEvent(new dom.window.Event("beforeunload"));
        }

        if (typeof dom?.window?.close === "function") {
          dom.window.close();
        }

        // Clear dom
        if (typeof dom?.window?.document?.write === "function") {
          dom.window.document.write();
        }
        files = null;
        vmContext = null;
      };

      if (!sharedContext?.events) {
        throw new Error("events are required in sharedContext object!");
      }

      sharedContext?.events.once("ready", onDone, this);
      virtualConsole?.on("jsdomError", onError);
      sharedContext?.events.once("error", onError, this);
      dom?.window.addEventListener("error", onError);
    });

    return renderResult;
  }

  private transformBrowserError(
    error: ResponseError | ErrorEvent,
    output: ConsoleMessage[]
  ) {
    const message = error.message;

    if (output.length) {
      message + "\n" + this.logToErrorMessage(output);
    }

    const newError = new Error(message);
    if ((error as Error).stack) {
      newError.stack = (error as Error).stack;
    }
    if ((error as ResponseError).status) {
      (newError as ResponseError).status = (error as ResponseError).status;
    }
    return newError;
  }

  async renderComponent({
    componentTagName,
    sharedContext,
    templateFile = this.options.defaultTemplateFile,
    rootTag = this.options.defaultRootTag,
    output = "pipe",
  }: {
    templateFile?: string;
    rootTag?: string;
    componentTagName: string;
    sharedContext?: SharedContext;
    output?: OutputType;
  }): Promise<RenderResult> {
    sharedContext = sharedContext || (await this.getSharedContext());

    const template = await this.templateFile.load(
      templateFile,
      rootTag,
      componentTagName,
      {
        env: sharedContext.env,
        templateVars: sharedContext.templateVars,
      }
    );

    try {
      return await this.render(
        template.layout,
        sharedContext,
        undefined,
        output
      );
    } catch (error) {
      this.log.error(`Error on render component! rootTag: "${rootTag}"`);
      this.log.error(error);
      throw error;
    }
  }

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
