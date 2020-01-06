import { Reader } from '../../interfaces';
export declare class FileSystemReader implements Reader {
    private readonly directory;
    constructor(directory: string);
    list(): Promise<string[]>;
    read(name: string): Promise<string>;
    readAnyOf(filenames: string[]): Promise<string | undefined>;
    getDirname(pathString?: string): string;
}
