    
import { Command, CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';
import { ICommandInput } from '../interfaces';
import { Collection } from '../lib/schematics';
import * as Table from 'cli-table3';
import { debug as Debug } from 'debug';

export class GenerateCommand extends AbstractCommand {

  debug = Debug('commands:generate');

  public load(program: CommanderStatic) {
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
      .action(async (schematicOrAlias: string, name: string, path: string, command: Command) => {

        const schematic = Collection.getSchematic(schematicOrAlias);

        const options: ICommandInput[] = [];
        options.push({ name: 'dry-run', value: !!command.dryRun });
        options.push({ name: 'flat', value: command.flat });
        options.push({ name: 'spec', value: command.spec });
        options.push({ name: 'templateEngine', value: command.templateEngine });
        options.push({ name: 'collection', value: command.collection });
        options.push({ name: 'sourceRoot', value: command.sourceRoot });

        const inputs: ICommandInput[] = [];
        inputs.push({ name: 'schematic', value: schematic!.name });
        inputs.push({ name: 'name', value: name });
        inputs.push({ name: 'path', value: path });

        this.debug('inputs: ', inputs)

        await this.action.handle(inputs, options)
        .catch((error) => {
          console.error(error);
        });
      });
  }

  private buildDescription(): string {
    return (
      'Generate a Riba schematic element\n' +
      '  Available schematics:\n' +
      this.buildSchematicsListAsTable()
    );
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
  private buildSchematicsListAsTable(): string {
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
    const table: any = new Table(tableConfig);
    for (const schematic of Collection.getSchematics()) {
      table.push([schematic.name, schematic.alias]);
    }
    return table.toString();
  }

}
