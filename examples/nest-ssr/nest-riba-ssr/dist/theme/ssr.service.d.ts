import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThemeConfig } from '@ribajs/ssr';
import type { Request } from 'express';
import type { SharedContext, RenderEngine } from '@ribajs/ssr';
import type { RenderResult } from '../types';
export declare class SsrService {
    log: Logger;
    theme: ThemeConfig;
    constructor(config: ConfigService);
    isRenderEngineValid(engine: RenderEngine): boolean;
    getSharedContext(req: Request): Promise<SharedContext>;
    getTemplateEngine(templatePath: string): string;
    transformLayout(layout: string, rootTag: string, pageTag: string): Promise<string>;
    readSsrScripts(): Promise<{
        vendors: string;
        main: string;
    }>;
    renderTemplate(templatePath: string, variables: any): Promise<any>;
    renderWithJSDom(layout: string, componentTagName: string, sharedContext: SharedContext): Promise<RenderResult>;
    renderWithHappyDom(layout: string, componentTagName: string, sharedContext: SharedContext): Promise<RenderResult>;
    renderComponent({ template, rootTag, componentTagName, engine, sharedContext, }: {
        template?: string;
        rootTag?: string;
        componentTagName: string;
        engine?: RenderEngine;
        sharedContext: SharedContext;
    }): Promise<RenderResult>;
}
