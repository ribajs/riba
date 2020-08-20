#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const commander_1 = __importDefault(require("commander"));
const commands_1 = require("../commands");
const bootstrap = () => {
    const program = commander_1.default;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    program.version(require("../../package.json").version);
    commands_1.CommandLoader.load(program);
    commander_1.default.parse(process.argv);
    if (!program.args.length) {
        program.outputHelp();
    }
};
bootstrap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmliYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW4vcmliYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSx1Q0FBcUM7QUFDckMsMERBQWtDO0FBQ2xDLDBDQUE0QztBQUU1QyxNQUFNLFNBQVMsR0FBRyxHQUFHLEVBQUU7SUFDckIsTUFBTSxPQUFPLEdBQUcsbUJBQVMsQ0FBQztJQUMxQiw4REFBOEQ7SUFDOUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2RCx3QkFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QixtQkFBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ3hCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUN0QjtBQUNILENBQUMsQ0FBQztBQUVGLFNBQVMsRUFBRSxDQUFDIn0=