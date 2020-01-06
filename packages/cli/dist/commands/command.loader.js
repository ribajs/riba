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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5sb2FkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvY29tbWFuZC5sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFHMUIsVUFBVTtBQUNWLHdDQUFtRTtBQUVuRSxXQUFXO0FBQ1gsbUNBQW1FO0FBR25FLE1BQWEsYUFBYTtJQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQXdCO1FBQ3pDLElBQUk7WUFDRixJQUFJLHVCQUFlLENBQUMsSUFBSSx3QkFBYyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEQsSUFBSSxrQkFBVSxDQUFDLElBQUksbUJBQVMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlDLElBQUksbUJBQVcsQ0FBQyxJQUFJLG9CQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNqRDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDakM7UUFHRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVPLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxPQUF3QjtRQUMxRCxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7WUFDM0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4RSxPQUFPLENBQUMsR0FBRyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7WUFDNUQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXJCRCxzQ0FxQkMifQ==