"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_manager_1 = require("./metadata.manager");
class ModuleMetadataDeclarator {
    declare(content, options) {
        const manager = new metadata_manager_1.MetadataManager(content);
        if (!options.symbol) {
            throw new Error('Symbol not found!');
        }
        const inserted = manager.insert(options.metadata, options.symbol, options.staticOptions);
        return inserted;
    }
}
exports.ModuleMetadataDeclarator = ModuleMetadataDeclarator;
