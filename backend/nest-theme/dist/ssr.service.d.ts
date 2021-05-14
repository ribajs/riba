import { Logger } from '@nestjs/common';
import { JSDOM } from 'jsdom';
import { ConfigService } from '@nestjs/config';
import { TemplateVars } from './types/template-vars';
import { ThemeConfig, ErrorObj } from '@ribajs/ssr';
import type { Request } from 'express';
import type { SharedContext } from '@ribajs/ssr';
import type { RenderResult } from './types';
import { SourceFileService } from './source-file/source-file.service';
import { TemplateFileService } from './template-file/template-file.service';
export declare class SsrService {
    protected readonly sourceFile: SourceFileService;
    protected readonly templateFile: TemplateFileService;
    log: Logger;
    theme: ThemeConfig;
    constructor(config: ConfigService, sourceFile: SourceFileService, templateFile: TemplateFileService);
    getSharedContext(req: Request, templateVars: TemplateVars, errorObj?: ErrorObj): Promise<SharedContext>;
    protected createDomForLayout(layout: string): Promise<JSDOM>;
    render(layout: string, sharedContext: SharedContext, scriptFilenames?: string[]): Promise<RenderResult>;
    protected transformBrowserError(error: Error | ErrorEvent): Error;
    renderComponent({ templatePath, rootTag, componentTagName, sharedContext, }: {
        templatePath?: string;
        rootTag?: string;
        componentTagName: string;
        sharedContext: SharedContext;
    }): Promise<RenderResult>;
}
