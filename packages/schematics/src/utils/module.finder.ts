import { join, Path, PathFragment } from '@angular-devkit/core';
import { DirEntry, Tree } from '@angular-devkit/schematics';
import { IFindOptions } from '../interfaces';

export class ModuleFinder {
  constructor(private tree: Tree) {}

  public find(options: IFindOptions): Path | null {
    const generatedDirectoryPath: Path = options.path;
    const generatedDirectory: DirEntry = this.tree.getDir(
      generatedDirectoryPath,
    );
    return this.findIn(generatedDirectory);
  }

  private findIn(directory: DirEntry): Path | null {
    if (!directory) {
      return null;
    }
    const moduleFilename: PathFragment | undefined = directory.subfiles.find(filename =>
      /\.module\.(t|j)s/.test(filename),
    );
    if (!directory.parent) {
      return null;
    }
    return moduleFilename !== undefined
      ? join(directory.path, moduleFilename.valueOf())
      : this.findIn(directory.parent);
  }
}
