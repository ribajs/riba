"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const element_factory_1 = require("../../utils/element.factory");
const source_root_helpers_1 = require("../../utils/source-root.helpers");
const ELEMENT_METADATA = 'components';
const ELEMENT_TYPE = 'component';
function main(options) {
    options.metadata = options.metadata || ELEMENT_METADATA;
    options.type = options.type || ELEMENT_TYPE;
    const elementFactory = new element_factory_1.ElementFactory(options);
    const rules = schematics_1.chain([
        source_root_helpers_1.mergeSourceRoot(options),
        // Adds an export to the index file
        elementFactory.addExportToIndex(),
        schematics_1.mergeWith(elementFactory.generate()),
    ]);
    return (tree, context) => {
        return schematics_1.branchAndMerge(rules)(tree, context);
    };
}
exports.main = main;
