    
import { Command, CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';
import { ICommandInput } from '../interfaces/command.input';

export class NewCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('new [name]')
      .alias('n')
      .description('Generate a new Riba project')
      // .option('-g, --skip-git', 'Allow to skip git repository initialization.')
      // .option('-s, --skip-install', 'Allow to skip package installation.')
      .action(async (name: string, command: Command) => {
        const options: ICommandInput[] = [];
        options.push({ name: 'skip-git', value: !!command.skipGit });
        options.push({ name: 'skip-install', value: !!command.skipInstall });

        const inputs: ICommandInput[] = [];
        inputs.push({ name: 'name', value: name });

        await this.action.handle(inputs, options);
      });
  }
}
