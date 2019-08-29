"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
class IndexFinder {
    constructor(tree) {
        this.tree = tree;
    }
    find(options) {
        const indexPath = options.path;
        const generatedDirectory = this.tree.getDir(indexPath);
        return this.findInOrCreate(options, generatedDirectory, false);
    }
    findInOrCreate(options, directory, createIfNotFound) {
        if (!directory) {
            return null;
        }
        const indexFilename = this.findIn(options, directory);
        // if found in current path
        if (indexFilename) {
            return core_1.join(directory.path, indexFilename.valueOf());
        }
        // check parent dir or create index in there
        if (!options.flat && !createIfNotFound) {
            return this.findInOrCreate(options, directory.parent, true);
        }
        // otherwise create an index file if createIfNotFound is ture
        const newIndexFilePath = core_1.join(directory.path, `index.${options.language}`);
        this.tree.create(newIndexFilePath, '');
        return newIndexFilePath;
    }
    findIn(options, directory) {
        const indexFilename = directory.subfiles.find(filename => new RegExp(`index\.${options.language}`, 's').test(filename));
        return indexFilename;
    }
}
exports.IndexFinder = IndexFinder;
