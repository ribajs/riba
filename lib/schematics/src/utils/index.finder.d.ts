import { Path, PathFragment } from '@angular-devkit/core';
import { DirEntry, Tree } from '@angular-devkit/schematics';
import { IFindOptions } from '../interfaces';
export declare class IndexFinder {
    private tree;
    constructor(tree: Tree);
    find(options: IFindOptions): Path | null;
    private findInOrCreate;
    findIn(options: IFindOptions, directory: DirEntry): PathFragment | undefined;
}
