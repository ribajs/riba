import { ConfigService } from '@nestjs/config';
import { TemplateFile } from './types';
export declare class TemplateFileService {
    private log;
    private theme;
    private defaultEngine;
    private dir;
    constructor(config: ConfigService);
    private getEngine;
    private normalizePath;
    private transform;
    load(path: string, rootTag: string, componentTagName: string, variables?: any): Promise<TemplateFile>;
}
