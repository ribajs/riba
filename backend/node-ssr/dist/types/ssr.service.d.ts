import type { ErrorObj, RequestContext } from "@ribajs/ssr";
import type { TemplateVars, RenderResult, SsrServiceOptionsArg, SharedContext, OutputType, ConsoleMessage } from "./types/index";
export declare class SsrService {
    log: Console;
    private sourceFile;
    private templateFile;
    private options;
    constructor(options: SsrServiceOptionsArg);
    getSharedContext(req?: Partial<RequestContext>, templateVars?: TemplateVars, errorObj?: ErrorObj): Promise<SharedContext>;
    render(layout: string, sharedContext?: SharedContext, scriptFilenames?: string[], output?: OutputType): Promise<RenderResult>;
    private transformBrowserError;
    renderComponent({ componentTagName, sharedContext, templateFile, rootTag, output, }: {
        templateFile?: string;
        rootTag?: string;
        componentTagName: string;
        sharedContext?: SharedContext;
        output?: OutputType;
    }): Promise<RenderResult>;
    logOutput(logs: ConsoleMessage[]): void;
    logToErrorMessage(logs: ConsoleMessage[]): string;
}
