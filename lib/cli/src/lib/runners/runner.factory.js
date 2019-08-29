"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const npm_runner_1 = require("./npm.runner");
const interfaces_1 = require("../../interfaces");
const schematic_runner_1 = require("./schematic.runner");
const yarn_runner_1 = require("./yarn.runner");
class RunnerFactory {
    static create(runner) {
        switch (runner) {
            case interfaces_1.Runner.SCHEMATIC:
                return new schematic_runner_1.SchematicRunner();
            case interfaces_1.Runner.NPM:
                return new npm_runner_1.NpmRunner();
            case interfaces_1.Runner.YARN:
                return new yarn_runner_1.YarnRunner();
            default:
                console.info(chalk_1.default.yellow(`[WARN] Unsupported runner: ${runner}`));
        }
    }
}
exports.RunnerFactory = RunnerFactory;
