import chalk from 'chalk';
import { debug as Debug } from 'debug';
import { ICommandInput, IConfiguration } from '../interfaces';
import { AbstractAction } from './abstract.action';
import { Collection, SchematicOption } from '../lib/schematics';
import { FileSystemReader } from '../lib/readers';

export class GenerateAction extends AbstractAction {

  debug = Debug('actions:generate');

  schematicOptions: SchematicOption[] = new Array<SchematicOption>();

  constructor() {
    super();
  }

  public async handle(inputs: ICommandInput[], options: ICommandInput[]) {
    await this.setDefaults(inputs, options);
    await this.generateFiles(this.concatOptions([inputs, options]));
  }

  protected async setDefaults(inputs: ICommandInput[], options: ICommandInput[]) {
    const configuration: IConfiguration = await this.loadConfiguration();
    this.setDefaultInput(options, 'language', configuration.language);
    this.setDefaultInput(options, 'sourceRoot', configuration.sourceRoot);
    this.setDefaultInput(options, 'collection', configuration.collection);
    this.setDefaultInput(options, 'templateEngine', configuration.templateEngine);

    const schematicInput = this.getInput(inputs, 'schematic');
    if (!schematicInput || typeof(schematicInput.value) !== 'string') {
      throw new Error('Unable to find a schematic for this configuration');
    }

    const pathInput = await this.setPathInput(inputs, configuration, schematicInput);

    if (!pathInput || typeof(pathInput.value) !== 'string') {
      throw new Error('pathInput not set!');
    }

    return inputs;
  }

  protected async generateFiles(inputs: ICommandInput[]) { 
    const collectionInput = this.getInput(inputs, 'collection');
    if (!collectionInput || typeof(collectionInput.value) !== 'string') {
      throw new Error('Unable to find a collection for this configuration');
    }
    const collection = new Collection(collectionInput.value);

    const schematicInput = this.getInput(inputs, 'schematic');
    if (!schematicInput || typeof(schematicInput.value) !== 'string') {
      throw new Error('Unable to find a schematic for this configuration');
    }

    this.schematicOptions = this.mapSchematicOptions(inputs);

    try {
      await collection.execute(schematicInput.value, this.schematicOptions);
    } catch (error) {
      if (error && error.message) {
        console.error(chalk.red(error.message));
      }
    }
  }

  private mapSchematicOptions(inputs: ICommandInput[]): SchematicOption[] {
    inputs.forEach(input => {
      if (input.name !== 'schematic' && input.value !== undefined) {
        this.schematicOptions.push(new SchematicOption(input.name, input.value));
      }
    });
    return this.schematicOptions;
  };

  /**
   * If no path is set and the current directory has not the name of the default directory name, only then set the default path
   * @param inputs
   * @param configuration
   * @param schematicInput
   */
  public async setPathInput(inputs: ICommandInput[], configuration: IConfiguration, schematicInput: ICommandInput) {
    let pathInput = this.getInput(inputs, 'path');
    if (!pathInput || typeof(pathInput.value) !== 'string') {
      const fsr = new FileSystemReader(process.cwd());
      if (typeof(schematicInput.value) === 'string' && configuration[schematicInput.value] && configuration[schematicInput.value].path ) {
        const currentDir = fsr.getDirname();
        const targetDir = fsr.getDirname(configuration[schematicInput.value].path);
        if (currentDir !== targetDir) {
          pathInput = this.setInput(inputs, 'path', configuration[schematicInput.value].path);
        }
      }
    } else {
      if(pathInput.value === '.') {
        pathInput.value = '';
      }
    }

    return pathInput;
  }
}
