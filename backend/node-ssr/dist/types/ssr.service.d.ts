import type { ErrorObj, RequestContext } from "@ribajs/ssr";
import type { TemplateVars, RenderResult, SsrServiceOptionsArg, SharedContext } from "./types/index";
export declare class SsrService {
    log: Console;
    private sourceFile;
    private templateFile;
    private options;
    constructor(options: SsrServiceOptionsArg);
    getSharedContext(req?: Partial<RequestContext>, templateVars?: TemplateVars, errorObj?: ErrorObj): Promise<SharedContext>;
    private createDomForLayout;
    render(layout: string, sharedContext?: SharedContext, scriptFilenames?: string[], pipeOutput?: boolean): Promise<RenderResult>;
    private transformBrowserError;
    renderComponent({ componentTagName, sharedContext, templateFile, rootTag, pipeOutput, }: {
        templateFile?: string;
        rootTag?: string;
        componentTagName: string;
        sharedContext?: SharedContext;
        pipeOutput?: boolean;
    }): Promise<RenderResult>;
}
