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
        const schematic = Collection.schematics.find((s) => s.name === name || s.alias === name);
        return schematic;
    }
}
exports.Collection = Collection;
Collection.schematics = [
    { name: "component", alias: "c" },
    { name: "binder", alias: "b" },
    { name: "formatter", alias: "f" },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2NoZW1hdGljcy9jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQTZEO0FBQzdELCtEQUEyRDtBQVEzRCxNQUFhLFVBQVcsU0FBUSx3Q0FBa0I7SUFPaEQsWUFDRSxVQUFrQixFQUNsQixTQUF5QixJQUFJLHlCQUFlLEVBQUU7UUFFOUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFZLEVBQUUsT0FBMEI7UUFDM0QsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sTUFBTSxDQUFDLGFBQWE7UUFDekIsT0FBTyxVQUFVLENBQUMsVUFBVSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQVk7UUFDckMsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQzFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FDM0MsQ0FBQztRQUNGLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7O0FBL0JILGdDQWdDQztBQS9CZ0IscUJBQVUsR0FBZ0I7SUFDdkMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7SUFDakMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7SUFDOUIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7Q0FDbEMsQ0FBQyJ9