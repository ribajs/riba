import type { SharedContext, ErrorObj, RequestContext } from "@ribajs/ssr";
import type { TemplateVars, RenderResult, SsrServiceOptionsArg } from "./types/index";
export declare class SsrService {
    log: Console;
    private sourceFile;
    private templateFile;
    private options;
    constructor(options: SsrServiceOptionsArg);
    getSharedContext(req?: Partial<RequestContext>, templateVars?: TemplateVars, errorObj?: ErrorObj): Promise<SharedContext>;
    private createDomForLayout;
    render(layout: string, sharedContext?: SharedContext, scriptFilenames?: string[]): Promise<RenderResult>;
    private transformBrowserError;
    renderComponent({ componentTagName, sharedContext, templateFile, rootTag, }: {
        templateFile?: string;
        rootTag?: string;
        componentTagName: string;
        sharedContext?: SharedContext;
    }): Promise<RenderResult>;
}
