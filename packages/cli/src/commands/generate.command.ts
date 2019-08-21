    
import { Command, CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';
import { ICommandInput } from '../interfaces/command.input';
import { RibaCollection } from '../lib/schematics/riba.collection';
import * as Table from 'cli-table3';
import { debug as Debug } from 'debug';

export class GenerateCommand extends AbstractCommand {

  debug = Debug('commands:generate');

  public load(program: CommanderStatic) {
    program
      .command('generate <schematic> <name> [path]')
      .alias('g')    
      .description(this.buildDescription())  
      .option('--template-engine <name>', 'Which template engine to use', 'html')
      .action(async (schematic: string, name: string, path: string, command: Command) => {
        const options: ICommandInput[] = [];
        options.push({ name: 'template-engine', value: command.templateEngine});

        const inputs: ICommandInput[] = [];
        inputs.push({ name: 'schematic', value: schematic });
        inputs.push({ name: 'name', value: name });
        inputs.push({ name: 'path', value: path });

        this.debug('inputs: ', inputs)

        await this.action.handle(inputs, options);
      });
  }

  private buildDescription(): string {
    return (
      'Generate a Riba schematic element\n' +
      '  Available schematics:\n' +
      this.buildSchematicsListAsTable()
    );
  }

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
    for (const schematic of RibaCollection.getSchematics()) {
      table.push([schematic.name, schematic.alias]);
    }
    return table.toString();
  }

}
