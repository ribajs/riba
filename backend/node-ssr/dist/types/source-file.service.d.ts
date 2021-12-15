import { SourceFile } from "./types";
export declare class SourceFileService {
    private dir;
    constructor(dir: string);
    load(filename: string): Promise<SourceFile>;
    loads(filenames: string[]): Promise<SourceFile[]>;
}
