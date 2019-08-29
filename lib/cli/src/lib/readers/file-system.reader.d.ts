import { IReader } from '../../interfaces';
export declare class FileSystemReader implements IReader {
    private readonly directory;
    constructor(directory: string);
    list(): Promise<string[]>;
    read(name: string): Promise<string>;
    readAnyOf(filenames: string[]): Promise<string | undefined>;
    getDirname(pathString?: string): string;
}
