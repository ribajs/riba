import { Logger } from '@nestjs/common';
import { ThemeConfig } from '@ribajs/ssr';
import { ConfigService } from '@nestjs/config';
import { TemplateFile } from './types';
export declare class TemplateFileService {
    protected log: Logger;
    protected theme: ThemeConfig;
    protected templates: Map<string, TemplateFile>;
    protected defaultEngine: string;
    protected dir: string;
    constructor(config: ConfigService);
    protected hashCode(str: string): number;
    protected getKey(path: string, componentTagName: string, variables: any): string;
    protected getEngine(templatePath: string): string;
    protected normalizePath(path: string): string;
    protected transform(layout: string, rootTag: string, componentTagName: string): string;
    protected loadAndSetCache(key: string, path: string, rootTag: string, componentTagName: string, variables?: any): Promise<TemplateFile>;
    load(path: string, rootTag: string, componentTagName: string, variables?: any): Promise<TemplateFile>;
}
