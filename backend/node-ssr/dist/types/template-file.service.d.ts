import { TemplateFile, SupportedTemplateEngines } from "./types";
export declare class TemplateFileService {
    private dir;
    private defaultEngine;
    private log;
    constructor(dir: string, defaultEngine: SupportedTemplateEngines);
    private getEngine;
    private normalizePath;
    private transform;
    load(path: string, rootTag: string, componentTagName: string, variables?: any): Promise<TemplateFile>;
}
