import chalk from "chalk";
import { CommanderStatic } from "commander";

// Actions
import { GenerateAction, InfoAction, NewAction } from "../actions";

// Commands
import { GenerateCommand, InfoCommand, NewCommand } from "./index";

export class CommandLoader {
  public static load(program: CommanderStatic): void {
    try {
      new GenerateCommand(new GenerateAction()).load(program);
      new NewCommand(new NewAction()).load(program);
      new InfoCommand(new InfoAction()).load(program);
    } catch (error) {
      console.error(chalk.red(error));
    }

    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: CommanderStatic) {
    program.on("command:*", () => {
      console.error(chalk.red("Invalid command: %s"), program.args.join(" "));
      console.log("See --help for a list of available commands.");
      process.exit(1);
    });
  }
}
