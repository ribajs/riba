"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchematicRunner = void 0;
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
        const binaryPath = ["node_modules", ".bin", "schematics"];
        const combineSegments = (pkgLastIndex) => [
            path_1.sep,
            ...segments.slice(0, pkgLastIndex),
            ...binaryPath,
        ];
        const globalBinPathSegments = combineSegments(segments.lastIndexOf("cli") + 1);
        const schematicsGlobalPath = path_1.join(...globalBinPathSegments);
        if (fs_1.existsSync(schematicsGlobalPath)) {
            return schematicsGlobalPath;
        }
        const localBinPathSegments = combineSegments(segments.lastIndexOf("node_modules"));
        const schematicsLocalPath = path_1.join(...localBinPathSegments);
        if (fs_1.existsSync(schematicsLocalPath)) {
            return schematicsLocalPath;
        }
        const schematicsBin = path_1.join(__dirname, "../../..", "node_modules/.bin/schematics");
        this.debug("Äschematics binary: " + schematicsBin);
        return schematicsBin;
    }
}
exports.SchematicRunner = SchematicRunner;
SchematicRunner.debug = debug_1.debug("schematic:runner");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hdGljLnJ1bm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcnVubmVycy9zY2hlbWF0aWMucnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUFnQztBQUNoQywrQkFBaUM7QUFDakMsaUNBQXVDO0FBRXZDLHVEQUFtRDtBQUVuRCxNQUFhLGVBQWdCLFNBQVEsZ0NBQWM7SUFHakQ7UUFDRSxLQUFLLENBQUMsSUFBSSxlQUFlLENBQUMsMkJBQTJCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFTSxNQUFNLENBQUMsMkJBQTJCLENBQUMsSUFBWTtRQUNwRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQUcsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sVUFBVSxHQUFHLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUUxRCxNQUFNLGVBQWUsR0FBRyxDQUFDLFlBQW9CLEVBQUUsRUFBRSxDQUFDO1lBQ2hELFVBQUc7WUFDSCxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQztZQUNsQyxHQUFHLFVBQVU7U0FDZCxDQUFDO1FBQ0YsTUFBTSxxQkFBcUIsR0FBRyxlQUFlLENBQzNDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUNoQyxDQUFDO1FBQ0YsTUFBTSxvQkFBb0IsR0FBRyxXQUFJLENBQUMsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzVELElBQUksZUFBVSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7WUFDcEMsT0FBTyxvQkFBb0IsQ0FBQztTQUM3QjtRQUVELE1BQU0sb0JBQW9CLEdBQUcsZUFBZSxDQUMxQyxRQUFRLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUNyQyxDQUFDO1FBQ0YsTUFBTSxtQkFBbUIsR0FBRyxXQUFJLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzFELElBQUksZUFBVSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7WUFDbkMsT0FBTyxtQkFBbUIsQ0FBQztTQUM1QjtRQUNELE1BQU0sYUFBYSxHQUFHLFdBQUksQ0FDeEIsU0FBUyxFQUNULFVBQVUsRUFDViw4QkFBOEIsQ0FDL0IsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEdBQUcsYUFBYSxDQUFDLENBQUM7UUFDbkQsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQzs7QUF0Q0gsMENBdUNDO0FBdENrQixxQkFBSyxHQUFhLGFBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDIn0=