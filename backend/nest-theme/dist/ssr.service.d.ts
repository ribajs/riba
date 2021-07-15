import { Logger } from '@nestjs/common';
import { VirtualConsole, JSDOM } from 'jsdom';
import { ConfigService } from '@nestjs/config';
import { TemplateVars } from './types/template-vars';
import { ErrorObj } from '@ribajs/ssr';
import type { FullThemeConfig } from './types/theme-config';
import type { Request } from 'express';
import type { SharedContext } from '@ribajs/ssr';
import type { RenderResult } from './types';
import { SourceFileService } from './source-file/source-file.service';
import { TemplateFileService } from './template-file/template-file.service';
import { ResponseError } from './types';
export declare class SsrService {
    protected readonly sourceFile: SourceFileService;
    protected readonly templateFile: TemplateFileService;
    log: Logger;
    theme: FullThemeConfig;
    constructor(config: ConfigService, sourceFile: SourceFileService, templateFile: TemplateFileService);
    getSharedContext(req: Request, templateVars: TemplateVars, errorObj?: ErrorObj): Promise<SharedContext>;
    protected createDomForLayout(layout: string): Promise<{
        dom: JSDOM;
        virtualConsole: VirtualConsole;
    }>;
    render(layout: string, sharedContext: SharedContext, scriptFilenames?: string[]): Promise<RenderResult>;
    protected transformBrowserError(error: ResponseError | ErrorEvent): Error;
    renderComponent({ templatePath, rootTag, componentTagName, sharedContext, }: {
        templatePath?: string;
        rootTag?: string;
        componentTagName: string;
        sharedContext: SharedContext;
    }): Promise<RenderResult>;
}
