"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const debug_1 = require("debug");
const abstract_runner_1 = require("./abstract.runner");
class SchematicRunner extends abstract_runner_1.AbstractRunner {
    constructor() {
        super(`"${SchematicRunner.findClosestSchematicsBinary(__dirname)}"`);
    }
    static findClosestSchematicsBinary(path) {
        const segments = path.split(path_1.sep);
        const binaryPath = ['node_modules', '.bin', 'schematics'];
        const combineSegments = (pkgLastIndex) => [
            path_1.sep,
            ...segments.slice(0, pkgLastIndex),
            ...binaryPath,
        ];
        const globalBinPathSegments = combineSegments(segments.lastIndexOf('cli') + 1);
        const schematicsGlobalPath = path_1.join(...globalBinPathSegments);
        if (fs_1.existsSync(schematicsGlobalPath)) {
            return schematicsGlobalPath;
        }
        const localBinPathSegments = combineSegments(segments.lastIndexOf('node_modules'));
        const schematicsLocalPath = path_1.join(...localBinPathSegments);
        if (fs_1.existsSync(schematicsLocalPath)) {
            return schematicsLocalPath;
        }
        const schematicsBin = path_1.join(__dirname, '../../..', 'node_modules/.bin/schematics');
        this.debug('Äschematics binary: ' + schematicsBin);
        return schematicsBin;
    }
}
exports.SchematicRunner = SchematicRunner;
SchematicRunner.debug = debug_1.debug('schematic:runner');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hdGljLnJ1bm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcnVubmVycy9zY2hlbWF0aWMucnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQWdDO0FBQ2hDLCtCQUFpQztBQUNqQyxpQ0FBdUM7QUFDdkMsdURBQW1EO0FBRW5ELE1BQWEsZUFBZ0IsU0FBUSxnQ0FBYztJQUlqRDtRQUNFLEtBQUssQ0FBQyxJQUFJLGVBQWUsQ0FBQywyQkFBMkIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVNLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxJQUFZO1FBQ3BELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBRyxDQUFDLENBQUM7UUFDakMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRTFELE1BQU0sZUFBZSxHQUFHLENBQUMsWUFBb0IsRUFBRSxFQUFFLENBQUM7WUFDaEQsVUFBRztZQUNILEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDO1lBQ2xDLEdBQUcsVUFBVTtTQUNkLENBQUM7UUFDRixNQUFNLHFCQUFxQixHQUFHLGVBQWUsQ0FDM0MsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQ2hDLENBQUM7UUFDRixNQUFNLG9CQUFvQixHQUFHLFdBQUksQ0FBQyxHQUFHLHFCQUFxQixDQUFDLENBQUM7UUFDNUQsSUFBSSxlQUFVLENBQUMsb0JBQW9CLENBQUMsRUFBRTtZQUNwQyxPQUFPLG9CQUFvQixDQUFDO1NBQzdCO1FBRUQsTUFBTSxvQkFBb0IsR0FBRyxlQUFlLENBQzFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQ3JDLENBQUM7UUFDRixNQUFNLG1CQUFtQixHQUFHLFdBQUksQ0FBQyxHQUFHLG9CQUFvQixDQUFDLENBQUM7UUFDMUQsSUFBSSxlQUFVLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUNuQyxPQUFPLG1CQUFtQixDQUFDO1NBQzVCO1FBQ0QsTUFBTSxhQUFhLEdBQUcsV0FBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsOEJBQThCLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixHQUFHLGFBQWEsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7O0FBbkNILDBDQW9DQztBQWxDUSxxQkFBSyxHQUFHLGFBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDIn0=