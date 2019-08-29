"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
// Actions
const actions_1 = require("../actions");
// Commands
const index_1 = require("./index");
class CommandLoader {
    static load(program) {
        try {
            new index_1.GenerateCommand(new actions_1.GenerateAction()).load(program);
            new index_1.NewCommand(new actions_1.NewAction()).load(program);
            new index_1.InfoCommand(new actions_1.InfoAction()).load(program);
        }
        catch (error) {
            console.error(chalk_1.default.red(error));
        }
        this.handleInvalidCommand(program);
    }
    static handleInvalidCommand(program) {
        program.on('command:*', () => {
            console.error(chalk_1.default.red('Invalid command: %s'), program.args.join(' '));
            console.log('See --help for a list of available commands.');
            process.exit(1);
        });
    }
}
exports.CommandLoader = CommandLoader;
