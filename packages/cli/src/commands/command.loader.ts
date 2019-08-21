import chalk from 'chalk';
import { CommanderStatic } from 'commander';

// Actions
import { GenerateAction, NewAction } from '../actions';

// Commands
import { GenerateCommand } from './generate.command';
import { NewCommand } from './new.command';


export class CommandLoader {
  public static load(program: CommanderStatic): void {
    new GenerateCommand(new GenerateAction()).load(program);
    new NewCommand(new NewAction()).load(program);

    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: CommanderStatic) {
    program.on('command:*', () => {
      console.error(chalk.red('Invalid command: %s'), program.args.join(' '));
      console.log('See --help for a list of available commands.');
      process.exit(1);
    });
  }
}
