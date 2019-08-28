import { Command, CommanderStatic } from 'commander';
import { ICommandInput } from '../interfaces';
import { AbstractCommand } from './abstract.command';
import { green } from '@angular-devkit/core/src/terminal';

export class NewCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('new [name]')
      .alias('n')
      .description('Generate a new Riba application')
      .option('-d, --dry-run', 'Allow to test changes before execute command.')
      .option('-g, --skip-git', 'Allow to skip git repository initialization.')
      .option('-s, --skip-install', 'Allow to skip package installation.')
      .option('-p, --package-manager [packageManager]', 'Allow to specify package manager to skip package-manager selection.', 'npm')
      .option('-l, --language [language]', 'Specify ts or js language to use', 'ts')
      .option('-sl, --style-language [styleLanguage]', 'Specify css or scss style sheet language to use', 'scss')
      .option('-t, --template-engine [templateEngine]', 'Specify template engine to use', 'html')
      .option('-c, --collection [collectionName]', 'Specify the Collection that shall be used.',)
      .action(async (name: string, command: Command) => {
        console.log();
        const options: ICommandInput[] = [];
        options.push({ name: 'dry-run', value: !!command.dryRun });
        options.push({ name: 'skip-git', value: !!command.skipGit });
        options.push({ name: 'skip-install', value: !!command.skipInstall });
        options.push({ name: 'package-manager', value: command.packageManager });
        options.push({ name: 'language', value: command.language });
        options.push({ name: 'styleLanguage', value: command.styleLanguage });
        options.push({ name: 'templateEngine', value: command.templateEngine });
        options.push({ name: 'collection', value: command.collection });

        const inputs: ICommandInput[] = [];
        inputs.push({ name: 'name', value: name });

        await this.action.handle(inputs, options);
      });
  }
}