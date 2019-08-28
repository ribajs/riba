import { join, Path, PathFragment } from '@angular-devkit/core';
import { DirEntry, Tree } from '@angular-devkit/schematics';
import { IFindOptions } from '../interfaces';

export class IndexFinder {
  constructor(private tree: Tree) {}

  public find(options: IFindOptions): Path | null {
    const indexPath: Path = options.path;
    const generatedDirectory: DirEntry = this.tree.getDir(indexPath);
    console.error('options', options);
    console.error('generatedDirectory', generatedDirectory.path);
    return this.findInOrCreate(options, generatedDirectory, false);
  }

  private findInOrCreate(options: IFindOptions, directory: DirEntry, createIfNotFound: boolean): Path | null {
    if (!directory) {
      return null;
    }
    const indexFilename = this.findIn(options, directory);

    // if found in current path
    if (indexFilename) {
      return join(directory.path, indexFilename.valueOf());
    }

    // check parent dir or create index in there
    if (!options.flat && !createIfNotFound) {
      return this.findInOrCreate(options, directory.parent, true);
    }

    // otherwise create an index file if createIfNotFound is ture
    const newIndexFilePath = join(directory.path, `index.${options.language}`);
    this.tree.create(newIndexFilePath, '');
    return newIndexFilePath;

  }

  findIn(options: IFindOptions, directory: DirEntry) {
    const indexFilename: PathFragment | undefined = directory.subfiles.find(filename =>
      new RegExp(`index\.${options.language}`, 's').test(filename),
    );
    return indexFilename;
  }
}
