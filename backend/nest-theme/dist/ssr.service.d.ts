import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TemplateVars } from './types/template-vars';
import { ThemeConfig, ErrorObj } from '@ribajs/ssr';
import type { Request } from 'express';
import type { SharedContext } from '@ribajs/ssr';
import type { RenderResult } from './types';
import { SourceFileService } from './source-file/source-file.service';
export declare class SsrService {
    protected readonly sourceFile: SourceFileService;
    log: Logger;
    theme: ThemeConfig;
    constructor(config: ConfigService, sourceFile: SourceFileService);
    getSharedContext(req: Request, templateVars: TemplateVars, errorObj?: ErrorObj): Promise<SharedContext>;
    getTemplateEngine(templatePath: string): string;
    transformLayout(layout: string, rootTag: string, pageTag: string): Promise<string>;
    renderTemplate(templatePath: string, variables: any): Promise<any>;
    renderWithJSDom(layout: string, componentTagName: string, sharedContext: SharedContext, scriptFilenames?: string[]): Promise<RenderResult>;
    protected transformBrowserError(error: Error | ErrorEvent): Error;
    renderComponent({ template, rootTag, componentTagName, sharedContext, }: {
        template?: string;
        rootTag?: string;
        componentTagName: string;
        sharedContext: SharedContext;
    }): Promise<RenderResult>;
}
