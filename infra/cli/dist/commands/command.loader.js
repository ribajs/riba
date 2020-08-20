"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLoader = void 0;
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
        program.on("command:*", () => {
            console.error(chalk_1.default.red("Invalid command: %s"), program.args.join(" "));
            console.log("See --help for a list of available commands.");
            process.exit(1);
        });
    }
}
exports.CommandLoader = CommandLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5sb2FkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvY29tbWFuZC5sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQTBCO0FBRzFCLFVBQVU7QUFDVix3Q0FBbUU7QUFFbkUsV0FBVztBQUNYLG1DQUFtRTtBQUVuRSxNQUFhLGFBQWE7SUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUF3QjtRQUN6QyxJQUFJO1lBQ0YsSUFBSSx1QkFBZSxDQUFDLElBQUksd0JBQWMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hELElBQUksa0JBQVUsQ0FBQyxJQUFJLG1CQUFTLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QyxJQUFJLG1CQUFXLENBQUMsSUFBSSxvQkFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakQ7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTyxNQUFNLENBQUMsb0JBQW9CLENBQUMsT0FBd0I7UUFDMUQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDeEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1lBQzVELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFwQkQsc0NBb0JDIn0=