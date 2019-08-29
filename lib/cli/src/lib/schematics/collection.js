"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runners_1 = require("../runners");
const abstract_collection_1 = require("./abstract.collection");
class Collection extends abstract_collection_1.AbstractCollection {
    constructor(collection, runner = new runners_1.SchematicRunner()) {
        super(collection, runner);
    }
    async execute(name, options) {
        await super.execute(name, options);
    }
    static getSchematics() {
        return Collection.schematics;
    }
    /**
     * Return the full schematic name by name or alias
     * @param name Name or alias
     */
    static getSchematic(name) {
        const schematic = Collection.schematics.find(s => s.name === name || s.alias === name);
        return schematic;
    }
}
exports.Collection = Collection;
Collection.schematics = [
    { name: 'component', alias: 'c' },
    { name: 'binder', alias: 'b' },
    { name: 'formatter', alias: 'f' },
];
