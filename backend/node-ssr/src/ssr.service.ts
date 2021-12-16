import { VirtualConsole, JSDOM } from "jsdom";
import { Context } from "vm";
import fetch from "node-fetch";
import type {
  ComponentLifecycleEventData,
  SharedContext,
  ErrorObj,
  RequestContext,
} from "@ribajs/ssr";
import { EventDispatcher } from "@ribajs/events";
import { SourceFileService } from "./source-file.service";
import { TemplateFileService } from "./template-file.service";
import { DummyConsole } from "./dummy-console";
import type {
  TemplateVars,
  ResponseError,
  RenderResult,
  SourceFile,
  SsrServiceOptions,
  SsrServiceOptionsArg,
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
        hostname: req.hostname,
        method: req.method,
        params: req.params,
        protocol: req.protocol,
        query: req.query,
        errorObj: errorObj,
        status: errorObj?.statusCode || req.status || 200,
      },
      env: process.env as { [key: string]: string },
      templateVars,
    };
    return sharedContext;
  }

  private async createDomForLayout(layout: string) {
    const virtualConsole: VirtualConsole | null = new VirtualConsole();
    virtualConsole.sendTo(console);

    const dom = new JSDOM(layout, {
      virtualConsole,
      runScripts: "outside-only", // 'dangerously',
      includeNodeLocations: true,
      beforeParse(window) {
        if (!window.fetch) {
          window.fetch = fetch as any;
        }

        if (!window.requestAnimationFrame) {
          // Dummy
          (window as any).requestAnimationFrame = () => {
            /** Do nothing */
          };
        }

        if (!window.indexedDB) {
          /**
           * Dummy
           * Maybe in the future:
           * * https://www.npmjs.com/package/indexeddb
           * * https://github.com/metagriffin/indexeddb-js
           * * ...
           */
          (window as any).indexedDB = {
            open: () => {
              return {};
            },
          };
        }
      },
    });
    return { dom, virtualConsole };
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
    scriptFilenames = ["main.bundle.js"]
  ) {
    sharedContext = sharedContext || (await this.getSharedContext());

    let { dom, virtualConsole } = (await this.createDomForLayout(layout)) as {
      dom: JSDOM | null;
      virtualConsole: VirtualConsole | null;
    };
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
        reject(this.transformBrowserError(error));
        clear();
        return true;
      };

      const onDone = (lifecycleEventData: ComponentLifecycleEventData) => {
        this.log.debug("[Riba lifecycle] Done.");
        if (!dom) {
          throw new Error("Dom is not defined!");
        }
        const html = dom.serialize();
        const result: RenderResult = {
          ...lifecycleEventData,
          html: html,
          css: [],
        };
        resolve(result);
        clear();
        return;
      };

      const clear = () => {
        // Ignore clear errors
        virtualConsole?.sendTo(new DummyConsole());
        virtualConsole?.off("jsdomError", onError);

        sharedContext?.events.off("error", onError, this);
        sharedContext?.events.off("ready", onDone, this);

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
        virtualConsole = null;
        dom = null;
      };

      sharedContext?.events.once("ready", onDone, this);
      virtualConsole?.on("jsdomError", onError);
      sharedContext?.events.once("error", onError, this);
      dom?.window.addEventListener("error", onError);
    });

    this.log.debug("[Riba lifecycle] Wait...");

    return renderResult;
  }

  private transformBrowserError(error: ResponseError | ErrorEvent) {
    const newError = new Error(error.message);
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
  }: {
    templateFile?: string;
    rootTag?: string;
    componentTagName: string;
    sharedContext?: SharedContext;
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
      return await this.render(template.layout, sharedContext);
    } catch (error) {
      this.log.error(`Error on render component! rootTag: "${rootTag}"`);
      this.log.error(error);
      throw error;
    }
  }
}
