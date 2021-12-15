import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TemplateVars, RenderResult, FullThemeConfig } from './types/index';
import { ErrorObj } from '@ribajs/ssr';
import type { Request } from 'express';
import type { SharedContext } from '@ribajs/ssr';
import { SourceFileService } from './source-file/source-file.service';
import { TemplateFileService } from './template-file/template-file.service';
export declare class SsrService {
    private readonly sourceFile;
    private readonly templateFile;
    log: Logger;
    theme: FullThemeConfig;
    constructor(config: ConfigService, sourceFile: SourceFileService, templateFile: TemplateFileService);
    getSharedContext(req: Request, templateVars: TemplateVars, errorObj?: ErrorObj): Promise<SharedContext>;
    private createDomForLayout;
    render(layout: string, sharedContext: SharedContext, scriptFilenames?: string[]): Promise<RenderResult>;
    private transformBrowserError;
    renderComponent({ templatePath, rootTag, componentTagName, sharedContext, }: {
        templatePath?: string;
        rootTag?: string;
        componentTagName: string;
        sharedContext: SharedContext;
    }): Promise<RenderResult>;
}
