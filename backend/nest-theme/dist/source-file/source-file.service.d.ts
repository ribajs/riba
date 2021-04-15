import { ThemeConfig } from '@ribajs/ssr';
import { ConfigService } from '@nestjs/config';
import { SourceFile } from './types';
export declare class SourceFileService {
    protected theme: ThemeConfig;
    protected scripts: Map<string, SourceFile>;
    protected dir: string;
    constructor(config: ConfigService);
    loadUncached(filename: string): Promise<SourceFile>;
    load(filename: string): Promise<SourceFile>;
    loads(filenames: string[]): Promise<SourceFile[]>;
}
