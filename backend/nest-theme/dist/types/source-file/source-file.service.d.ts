import { ConfigService } from '@nestjs/config';
import { SourceFile } from '../types';
export declare class SourceFileService {
    private theme;
    private dir;
    constructor(config: ConfigService);
    load(filename: string): Promise<SourceFile>;
    loads(filenames: string[]): Promise<SourceFile[]>;
}
