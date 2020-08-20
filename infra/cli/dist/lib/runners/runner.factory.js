"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunnerFactory = void 0;
const chalk_1 = __importDefault(require("chalk"));
const npm_runner_1 = require("./npm.runner");
const index_1 = require("../../interfaces/index");
const schematic_runner_1 = require("./schematic.runner");
const yarn_runner_1 = require("./yarn.runner");
class RunnerFactory {
    static create(runner) {
        switch (runner) {
            case index_1.Runner.SCHEMATIC:
                return new schematic_runner_1.SchematicRunner();
            case index_1.Runner.NPM:
                return new npm_runner_1.NpmRunner();
            case index_1.Runner.YARN:
                return new yarn_runner_1.YarnRunner();
            default:
                console.info(chalk_1.default.yellow(`[WARN] Unsupported runner: ${runner}`));
        }
    }
}
exports.RunnerFactory = RunnerFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVubmVyLmZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3J1bm5lcnMvcnVubmVyLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLDZDQUF5QztBQUN6QyxrREFBZ0Q7QUFDaEQseURBQXFEO0FBQ3JELCtDQUEyQztBQUUzQyxNQUFhLGFBQWE7SUFDakIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFjO1FBQ2pDLFFBQVEsTUFBTSxFQUFFO1lBQ2QsS0FBSyxjQUFNLENBQUMsU0FBUztnQkFDbkIsT0FBTyxJQUFJLGtDQUFlLEVBQUUsQ0FBQztZQUUvQixLQUFLLGNBQU0sQ0FBQyxHQUFHO2dCQUNiLE9BQU8sSUFBSSxzQkFBUyxFQUFFLENBQUM7WUFFekIsS0FBSyxjQUFNLENBQUMsSUFBSTtnQkFDZCxPQUFPLElBQUksd0JBQVUsRUFBRSxDQUFDO1lBRTFCO2dCQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBSyxDQUFDLE1BQU0sQ0FBQyw4QkFBOEIsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO0lBQ0gsQ0FBQztDQUNGO0FBaEJELHNDQWdCQyJ9