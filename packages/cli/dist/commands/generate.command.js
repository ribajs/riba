"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_command_1 = require("./abstract.command");
const schematics_1 = require("../lib/schematics");
const cli_table3_1 = __importDefault(require("cli-table3"));
const debug_1 = require("debug");
class GenerateCommand extends abstract_command_1.AbstractCommand {
    constructor() {
        super(...arguments);
        this.debug = debug_1.debug("commands:generate");
    }
    load(program) {
        program
            .command("generate <schematic> <name> [path]")
            .alias("g")
            .description(this.buildDescription())
            .option("--dry-run", "Allow to test changes before command execution")
            .option("--flat", "Enforce flat structure of generated element")
            .option("--no-spec", "Disable spec files generation")
            .option("-t, --template-engine [templateEngine]", "Which template engine to use")
            .option("-s, --style-language [styleLanguage]", "Which style language / engine to use")
            .option("-c, --collection [collectionName]", "Specify the schematic collection which should be used.")
            .option("--source-root [sourceRoot]", "Specify the root directory of your source files")
            .action(async (schematicOrAlias, name, path, command) => {
            const schematic = schematics_1.Collection.getSchematic(schematicOrAlias);
            const options = [];
            options.push({ name: "dry-run", value: !!command.dryRun });
            options.push({ name: "flat", value: command.flat });
            options.push({ name: "spec", value: command.spec });
            options.push({
                name: "templateEngine",
                value: command.templateEngine,
            });
            options.push({ name: "styleLanguage", value: command.styleLanguage });
            options.push({ name: "collection", value: command.collection });
            options.push({ name: "sourceRoot", value: command.sourceRoot });
            const inputs = [];
            inputs.push({ name: "schematic", value: schematic.name });
            inputs.push({ name: "name", value: name });
            inputs.push({ name: "path", value: path });
            this.debug("inputs: ", inputs);
            await this.action.handle(inputs, options).catch((error) => {
                console.error(error);
            });
        });
    }
    buildDescription() {
        return ("Generate a Riba schematic element\n" +
            "  Available schematics:\n" +
            this.buildSchematicsListAsTable());
    }
    /**
     * Returns a table listing which schematics are available with the generate argument
     * @example
     *  ┌───────────┬───────┐
     *  │ name      │ alias │
     *  │ component │ com   │
     *  │ ...       │ ...   │
     *  └───────────┴───────┘
     */
    buildSchematicsListAsTable() {
        const leftMargin = "    ";
        const tableConfig = {
            head: ["name", "alias"],
            chars: {
                // tslint:disable-next-line:quotemark
                left: leftMargin.concat("│"),
                "top-left": leftMargin.concat("┌"),
                "bottom-left": leftMargin.concat("└"),
                // tslint:disable-next-line:quotemark
                mid: "",
                "left-mid": "",
                "mid-mid": "",
                "right-mid": "",
            },
        };
        const table = new cli_table3_1.default(tableConfig);
        for (const schematic of schematics_1.Collection.getSchematics()) {
            table.push([schematic.name, schematic.alias]);
        }
        return table.toString();
    }
}
exports.GenerateCommand = GenerateCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUuY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9nZW5lcmF0ZS5jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EseURBQXFEO0FBRXJELGtEQUErQztBQUMvQyw0REFBK0I7QUFDL0IsaUNBQWlEO0FBRWpELE1BQWEsZUFBZ0IsU0FBUSxrQ0FBZTtJQUFwRDs7UUFDWSxVQUFLLEdBQWEsYUFBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFvR3pELENBQUM7SUFsR1EsSUFBSSxDQUFDLE9BQXdCO1FBQ2xDLE9BQU87YUFDSixPQUFPLENBQUMsb0NBQW9DLENBQUM7YUFDN0MsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUNwQyxNQUFNLENBQUMsV0FBVyxFQUFFLGdEQUFnRCxDQUFDO2FBQ3JFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsNkNBQTZDLENBQUM7YUFDL0QsTUFBTSxDQUFDLFdBQVcsRUFBRSwrQkFBK0IsQ0FBQzthQUNwRCxNQUFNLENBQ0wsd0NBQXdDLEVBQ3hDLDhCQUE4QixDQUMvQjthQUNBLE1BQU0sQ0FDTCxzQ0FBc0MsRUFDdEMsc0NBQXNDLENBQ3ZDO2FBQ0EsTUFBTSxDQUNMLG1DQUFtQyxFQUNuQyx3REFBd0QsQ0FDekQ7YUFDQSxNQUFNLENBQ0wsNEJBQTRCLEVBQzVCLGlEQUFpRCxDQUNsRDthQUNBLE1BQU0sQ0FDTCxLQUFLLEVBQ0gsZ0JBQXdCLEVBQ3hCLElBQVksRUFDWixJQUFZLEVBQ1osT0FBZ0IsRUFDaEIsRUFBRTtZQUNGLE1BQU0sU0FBUyxHQUFHLHVCQUFVLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFNUQsTUFBTSxPQUFPLEdBQW1CLEVBQUUsQ0FBQztZQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFB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