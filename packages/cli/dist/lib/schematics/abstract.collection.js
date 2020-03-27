"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("debug");
class AbstractCollection {
    constructor(collection, runner) {
        this.collection = collection;
        this.runner = runner;
        this.debug = debug_1.debug("schematic:collection");
    }
    async execute(name, options, extraFlags) {
        let command = this.buildCommandLine(name, options);
        command = extraFlags ? command.concat(` ${extraFlags}`) : command;
        this.debug(`Execute command: schematics ${command}`);
        await this.runner.run(command);
    }
    buildCommandLine(name, options) {
        return `${this.collection}:${name}${this.buildOptions(options)}`;
    }
    buildOptions(options) {
        return options.reduce((line, option) => {
            return line.concat(` ${option.toCommandString()}`);
        }, "");
    }
}
exports.AbstractCollection = AbstractCollection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QuY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2NoZW1hdGljcy9hYnN0cmFjdC5jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsaUNBQXVDO0FBR3ZDLE1BQWEsa0JBQWtCO0lBRzdCLFlBQXNCLFVBQWtCLEVBQVksTUFBc0I7UUFBcEQsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUFZLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBRmhFLFVBQUssR0FBYSxhQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUVtQixDQUFDO0lBRXZFLEtBQUssQ0FBQyxPQUFPLENBQ2xCLElBQVksRUFDWixPQUEwQixFQUMxQixVQUFtQjtRQUVuQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25ELE9BQU8sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDbEUsSUFBSSxDQUFDLEtBQUssQ0FBQywrQkFBK0IsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNyRCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsT0FBMEI7UUFDL0QsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUNuRSxDQUFDO0lBRU8sWUFBWSxDQUFDLE9BQTBCO1FBQzdDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNULENBQUM7Q0FDRjtBQXpCRCxnREF5QkMifQ==