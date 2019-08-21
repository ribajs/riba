import chalk from 'chalk';
import { debug as Debug } from 'debug';
import { ICommandInput, IConfiguration, IConfigurationLoader } from '../interfaces';
import { AbstractAction } from './abstract.action';
import { AbstractCollection, RibaCollection, SchematicOption } from '../lib/schematics';
import { ConfigurationLoader } from '../lib/configuration/configuration.loader';
import { FileSystemReader } from '../lib/readers';

export class GenerateAction extends AbstractAction {

  debug = Debug('actions:generate');

  schematicOptions: SchematicOption[] = new Array<SchematicOption>();

  constructor(readonly collection: AbstractCollection = new RibaCollection()) {
    super();
  }

  public async handle(inputs: ICommandInput[], options: ICommandInput[]) {
    await this.generateFiles(inputs.concat(options));
  }

  private async generateFiles(inputs: ICommandInput[]) {
    const configuration: IConfiguration = await this.loadConfiguration();

    this.schematicOptions = this.mapSchematicOptions(inputs);

    // Default options
    this.schematicOptions.push(
      new SchematicOption('templateEngine', configuration.templateEngine),
    );
    this.schematicOptions.push(
      new SchematicOption('language', configuration.language),
    );
    this.schematicOptions.push(
      new SchematicOption('sourceRoot', configuration.sourceRoot),
    );

    try {
      const schematicInput = this.getSchematic(inputs);
      if (!schematicInput) {
        throw new Error('Unable to find a schematic for this configuration');
      }
      this.debug('schematic: ' + schematicInput.value);
      this.debug('options:', this.schematicOptions);
      await this.collection.execute(schematicInput.value as string, this.schematicOptions);
    } catch (error) {
      if (error && error.message) {
        console.error(chalk.red(error.message));
      }
    }

  }

  private getName(inputs: ICommandInput[]) {
    const input = inputs.find(input => input.name === 'name');
    if (!input || !input.value) {
      throw new Error(chalk.red('A name is required!'));
    }
    return input.value.toString();
  }

  private getSchematic(inputs: ICommandInput[]) {
    const input = inputs.find(input => input.name === 'schematic');
    if (!input || !input.value) {
      throw new Error(chalk.red('A schematic name is required!'));
    }
    return input;
  }

  private mapSchematicOptions(inputs: ICommandInput[]): SchematicOption[] {
    inputs.forEach(input => {
      if (input.name !== 'schematic' && input.value !== undefined) {
        this.schematicOptions.push(new SchematicOption(input.name, input.value));
      }
    });
    return this.schematicOptions;
  };

  private async loadConfiguration() {
    const loader: IConfigurationLoader = new ConfigurationLoader(
      new FileSystemReader(process.cwd()),
    );
    return loader.load();
  }
}
