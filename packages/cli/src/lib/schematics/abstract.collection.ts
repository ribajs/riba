import { AbstractRunner } from '../runners';
import { SchematicOption } from './schematic.option';
import { debug as Debug } from 'debug';

export class AbstractCollection {

  protected debug = Debug('schematic:collection');

  constructor(protected collection: string, protected runner: AbstractRunner) {}

  public async execute(name: string, options: SchematicOption[], extraFlags?: string) {
    let command = this.buildCommandLine(name, options);
    command = extraFlags ? command.concat(` ${extraFlags}`) : command;
    this.debug(`Execute command: schematics ${command}`);
    await this.runner.run(command);
  }

  private buildCommandLine(name: string, options: SchematicOption[]): string {
    return `${this.collection}:${name}${this.buildOptions(options)}`;
  }

  private buildOptions(options: SchematicOption[]): string {
    return options.reduce((line, option) => {
      return line.concat(` ${option.toCommandString()}`);
    }, '');
  }
}
