"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_command_1 = require("./abstract.command");
const schematics_1 = require("../lib/schematics");
const Table = __importStar(require("cli-table3"));
const debug_1 = require("debug");
class GenerateCommand extends abstract_command_1.AbstractCommand {
    constructor() {
        super(...arguments);
        this.debug = debug_1.debug('commands:generate');
    }
    load(program) {
        program
            .command('generate <schematic> <name> [path]')
            .alias('g')
            .description(this.buildDescription())
            .option('--dry-run', 'Allow to test changes before command execution')
            .option('--flat', 'Enforce flat structure of generated element')
            .option('--no-spec', 'Disable spec files generation')
            .option('-t, --template-engine [templateEngine]', 'Which template engine to use')
            .option('-c, --collection [collectionName]', 'Specify the schematic collection which should be used.')
            .option('--source-root [sourceRoot]', 'Specify the root directory of your source files')
            .action(async (schematicOrAlias, name, path, command) => {
            const schematic = schematics_1.Collection.getSchematic(schematicOrAlias);
            const options = [];
            options.push({ name: 'dry-run', value: !!command.dryRun });
            options.push({ name: 'flat', value: command.flat });
            options.push({ name: 'spec', value: command.spec });
            options.push({ name: 'templateEngine', value: command.templateEngine });
            options.push({ name: 'collection', value: command.collection });
            options.push({ name: 'sourceRoot', value: command.sourceRoot });
            const inputs = [];
            inputs.push({ name: 'schematic', value: schematic.name });
            inputs.push({ name: 'name', value: name });
            inputs.push({ name: 'path', value: path });
            this.debug('inputs: ', inputs);
            await this.action.handle(inputs, options)
                .catch((error) => {
                console.error(error);
            });
        });
    }
    buildDescription() {
        return ('Generate a Riba schematic element\n' +
            '  Available schematics:\n' +
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
        const leftMargin = '    ';
        const tableConfig = {
            head: ['name', 'alias'],
            chars: {
                // tslint:disable-next-line:quotemark
                "left": leftMargin.concat('│'),
                'top-left': leftMargin.concat('┌'),
                'bottom-left': leftMargin.concat('└'),
                // tslint:disable-next-line:quotemark
                "mid": '',
                'left-mid': '',
                'mid-mid': '',
                'right-mid': '',
            },
        };
        const table = new Table(tableConfig);
        for (const schematic of schematics_1.Collection.getSchematics()) {
            table.push([schematic.name, schematic.alias]);
        }
        return table.toString();
    }
}
exports.GenerateCommand = GenerateCommand;
