"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2NoZW1hdGljcy9jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUE2RDtBQUM3RCwrREFBMkQ7QUFRM0QsTUFBYSxVQUFXLFNBQVEsd0NBQWtCO0lBT2hELFlBQ0UsVUFBa0IsRUFDbEIsU0FBeUIsSUFBSSx5QkFBZSxFQUFFO1FBRTlDLEtBQUssQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBWSxFQUFFLE9BQTBCO1FBQzNELE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxhQUFhO1FBQ3pCLE9BQU8sVUFBVSxDQUFDLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFZO1FBQ3JDLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUMxQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQzNDLENBQUM7UUFDRixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDOztBQS9CSCxnQ0FnQ0M7QUEvQmdCLHFCQUFVLEdBQWdCO0lBQ3ZDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO0lBQ2pDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO0lBQzlCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO0NBQ2xDLENBQUMifQ==