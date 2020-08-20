import { join, Path, PathFragment } from "@angular-devkit/core";
import { DirEntry, Tree } from "@angular-devkit/schematics";
import { FindOptions } from "../interfaces";

export class IndexFinder {
  constructor(private tree: Tree) {}

  public find(options: FindOptions): Path | null {
    const indexPath: Path = options.path;
    const generatedDirectory: DirEntry = this.tree.getDir(indexPath);
    return this.findInOrCreate(options, generatedDirectory, false);
  }

  private findInOrCreate(
    options: FindOptions,
    directory: DirEntry,
    createIfNotFound: boolean
  ): Path | null {
    if (!directory) {
      return null;
    }
    const indexFilename = this.findIn(options, directory);

    // if found in current path
    if (indexFilename) {
      return join(directory.path, indexFilename.valueOf());
    }

    // check parent dir or create index in there
    if (!options.flat && !createIfNotFound && directory.parent) {
      return this.findInOrCreate(options, directory.parent, true);
    }

    // otherwise create an index file if createIfNotFound is ture
    const newIndexFilePath = join(directory.path, `index.${options.language}`);
    this.tree.create(newIndexFilePath, "");
    return newIndexFilePath;
  }

  private findIn(options: FindOptions, directory: DirEntry) {
    const indexFilename: PathFragment | undefined = directory.subfiles.find(
      (filename) => {
        return new RegExp(`index.${options.language}`, "s").test(filename);
      }
    );
    return indexFilename;
  }
}
