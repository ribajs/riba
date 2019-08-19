    
import { Command, CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';
import { ICommandInput } from '../interfaces/command.input';
import { SkeletonGenerator } from '../lib/skeleton-generator/skeleton.generator';
import * as Table from 'cli-table3';

export class GenerateCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('generate <skeleton> <name> [path]')
      .alias('g')    
      .description(this.buildDescription())  
      .action(async (skeleton: string, name: string, path: string, command: Command) => {
        const options: ICommandInput[] = [];
        // Parse cli options here
        const inputs: ICommandInput[] = [];
        inputs.push({ name: 'skeleton', value: skeleton });
        inputs.push({ name: 'name', value: name });
        inputs.push({ name: 'path', value: path });

        await this.action.handle(inputs, options);
      });
  }

  private buildDescription(): string {
    return (
      'Generate a Riba skeleton element\n' +
      '  Available skeletons:\n' +
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
    for (const schematic of SkeletonGenerator.getSkeletons()) {
      table.push([schematic.name, schematic.alias]);
    }
    return table.toString();
  }

}
