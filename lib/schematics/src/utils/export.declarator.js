"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const element_export_declarator_1 = require("./element-export.declarator");
const module_metadata_declarator_1 = require("./module-metadata.declarator");
class ExportDeclarator {
    constructor(exports = new element_export_declarator_1.ElementExportDeclarator(), metadata = new module_metadata_declarator_1.ModuleMetadataDeclarator()) {
        this.exports = exports;
        this.metadata = metadata;
    }
    declare(content, options) {
        options = this.computeSymbol(options);
        content = this.exports.declare(content, options);
        /**
         * TODO Riba
         * A metadata of `"components"` would add the component to the array of `components` in:
         * ```ts
         *   @Module({
         *     components: [EachItemExample4Component],
         *   })
         * ```
         * but Riba currently not supports the `@Module` decorator
         */
        // content = this.metadata.declare(content, options);
        return content;
    }
    computeSymbol(options) {
        const target = Object.assign({}, options);
        if (options.type !== undefined) {
            target.symbol = strings_1.classify(options.name).concat(strings_1.capitalize(options.type));
        }
        else {
            target.symbol = strings_1.classify(options.name);
        }
        return target;
    }
}
exports.ExportDeclarator = ExportDeclarator;
