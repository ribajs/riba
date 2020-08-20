"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateCommand = void 0;
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
            if (!schematic?.name) {
                throw new Error("schematic.name must be defined!");
            }
            inputs.push({ name: "schematic", value: schematic?.name });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUuY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9nZW5lcmF0ZS5jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHlEQUFxRDtBQUVyRCxrREFBK0M7QUFDL0MsNERBQStCO0FBQy9CLGlDQUFpRDtBQUVqRCxNQUFhLGVBQWdCLFNBQVEsa0NBQWU7SUFBcEQ7O1FBQ1ksVUFBSyxHQUFhLGFBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBdUd6RCxDQUFDO0lBckdRLElBQUksQ0FBQyxPQUF3QjtRQUNsQyxPQUFPO2FBQ0osT0FBTyxDQUFDLG9DQUFvQyxDQUFDO2FBQzdDLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDcEMsTUFBTSxDQUFDLFdBQVcsRUFBRSxnREFBZ0QsQ0FBQzthQUNyRSxNQUFNLENBQUMsUUFBUSxFQUFFLDZDQUE2QyxDQUFDO2FBQy9ELE1BQU0sQ0FBQyxXQUFXLEVBQUUsK0JBQStCLENBQUM7YUFDcEQsTUFBTSxDQUNMLHdDQUF3QyxFQUN4Qyw4QkFBOEIsQ0FDL0I7YUFDQSxNQUFNLENBQ0wsc0NBQXNDLEVBQ3RDLHNDQUFzQyxDQUN2QzthQUNBLE1BQU0sQ0FDTCxtQ0FBbUMsRUFDbkMsd0RBQXdELENBQ3pEO2FBQ0EsTUFBTSxDQUNMLDRCQUE0QixFQUM1QixpREFBaUQsQ0FDbEQ7YUFDQSxNQUFNLENBQ0wsS0FBSyxFQUNILGdCQUF3QixFQUN4QixJQUFZLEVBQ1osSUFBWSxFQUNaLE9BQWdCLEVBQ2hCLEVBQUU7WUFDRixNQUFNLFNBQVMsR0FBRyx1QkFBVSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRTVELE1BQU0sT0FBTyxHQUFtQixFQUFFLENBQUM7WUFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUMzRCxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ1gsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxjQUFjO2FBQzlCLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztZQUN0RSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDaEUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBRWhFLE1BQU0sTUFBTSxHQUFtQixFQUFFLENBQUM7WUFDbEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUU7Z0JBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQzthQUNwRDtZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMzRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUUzQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUUvQixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDeEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FDRixDQUFDO0lBQ04sQ0FBQztJQUVPLGdCQUFnQjtRQUN0QixPQUFPLENBQ0wscUNBQXFDO1lBQ3JDLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FDbEMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNLLDBCQUEwQjtRQUNoQyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDMUIsTUFBTSxXQUFXLEdBQUc7WUFDbEIsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztZQUN2QixLQUFLLEVBQUU7Z0JBQ0wscUNBQXFDO2dCQUNyQyxJQUFJLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0JBQzVCLFVBQVUsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDbEMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUNyQyxxQ0FBcUM7Z0JBQ3JDLEdBQUcsRUFBRSxFQUFFO2dCQUNQLFVBQVUsRUFBRSxFQUFFO2dCQUNkLFNBQVMsRUFBRSxFQUFFO2dCQUNiLFdBQVcsRUFBRSxFQUFFO2FBQ2hCO1NBQ0YsQ0FBQztRQUNGLE1BQU0sS0FBSyxHQUFRLElBQUksb0JBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxQyxLQUFLLE1BQU0sU0FBUyxJQUFJLHVCQUFVLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDbEQsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDL0M7UUFDRCxPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMxQixDQUFDO0NBQ0Y7QUF4R0QsMENBd0dDIn0=