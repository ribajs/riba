import chalk from 'chalk';
import { ICommandInput, IConfiguration, IConfigurationLoader } from '../interfaces';
import { AbstractAction } from './abstract.action';
import { AbstractCollection, RibaCollection, SchematicOption } from '../lib/schematics';
import { ConfigurationLoader } from '../lib/configuration/configuration.loader';
import { FileSystemReader } from '../lib/readers';

export class GenerateAction extends AbstractAction {

  schematicOptions: SchematicOption[] = new Array<SchematicOption>();

  constructor(readonly collection: AbstractCollection = new RibaCollection()) {
    super();
  }

  public async handle(inputs: ICommandInput[], options: ICommandInput[]) {
    await this.generateFiles(inputs.concat(options));
  }

  private async generateFiles(inputs: ICommandInput[]) {
    const configuration: IConfiguration = await this.loadConfiguration();
    // console.log('Generate files: ', inputs);
    const name = this.getName(inputs);
    const path = this.getPath(inputs) || process.cwd();
    const templateEngine = this.getTemplateEngine(inputs) || 'html';

    this.schematicOptions = this.mapSchematicOptions(inputs);

    // Default options
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

  private getPath(inputs: ICommandInput[]) {
    const input = inputs.find(input => input.name === 'path');
    if (!input || !input.value) {
      return null;
    }
    return input.value.toString();
  }

  private getTemplateEngine(inputs: ICommandInput[]) {
    const input = inputs.find(input => input.name === 'template-engine');
    if (!input || !input.value) {
      return null;
    }
    return input.value.toString();
  }

  private mapSchematicOptions(inputs: ICommandInput[]): SchematicOption[] {
    const options: SchematicOption[] = [];
    inputs.forEach(input => {
      if (input.name !== 'schematic' && input.value !== undefined) {
        this.schematicOptions.push(new SchematicOption(input.name, input.value));
      }
    });
    return options;
  };

  private async loadConfiguration() {
    const loader: IConfigurationLoader = new ConfigurationLoader(
      new FileSystemReader(process.cwd()),
    );
    return loader.load();
  }
}
