import { join, Path, PathFragment } from '@angular-devkit/core';
import { DirEntry, Tree } from '@angular-devkit/schematics';
import { IFindOptions } from '../interfaces';

export class IndexFinder {
  constructor(private tree: Tree) {}

  public find(options: IFindOptions): Path | null {
    const indexPath: Path = options.path;
    const generatedDirectory: DirEntry = this.tree.getDir(indexPath);
    return this.findIn(options, generatedDirectory);
  }

  private findIn(options: IFindOptions, directory: DirEntry): Path | null {
    if (!directory) {
      return null;
    }
    const indexFilename: PathFragment | undefined = directory.subfiles.find(filename =>
      new RegExp(`index\.${options.language}`, 's').test(filename),
    );
    // if found
    if (indexFilename) {
      return join(directory.path, indexFilename.valueOf());
    }
    // otherwise create an index file
    const newIndexFilePath = join(directory.path, `index.${options.language}`);
    this.tree.create(newIndexFilePath, '');
    return newIndexFilePath;
  }
}
