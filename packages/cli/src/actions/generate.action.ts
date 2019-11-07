import chalk from 'chalk';
import { CommandInput, Configuration } from '../interfaces';
import { AbstractAction } from './abstract.action';
import { Collection, SchematicOption } from '../lib/schematics';
import { FileSystemReader } from '../lib/readers';
import { join, normalize } from 'path';

export class GenerateAction extends AbstractAction {

  schematicOptions: SchematicOption[] = new Array<SchematicOption>();

  constructor() {
    super();
  }

  public async handle(inputs: CommandInput[], options: CommandInput[]) {
    await this.setDefaults(inputs, options);
    await this.generateFiles(this.concatOptions([inputs, options]));
  }

  protected async setDefaults(inputs: CommandInput[], options: CommandInput[]) {
    const schematicInput = this.getInput(inputs, 'schematic');
    if (!schematicInput || typeof(schematicInput.value) !== 'string') {
      throw new Error('Unable to find a schematic for this configuration');
    }

    const configuration: Configuration = await this.loadConfiguration();

    this.setDefaultInput(options, 'language', configuration.language);
    this.setDefaultInput(options, 'sourceRoot', configuration.sourceRoot);
    this.setDefaultInput(options, 'collection', configuration.collection);
    this.setDefaultInput(options, 'templateEngine', configuration.templateEngine);
    this.setDefaultInput(options, 'flat', configuration[schematicInput.value].flat);

    const pathInput = await this.setPathInput(inputs, options, configuration, schematicInput);

    if (!pathInput || typeof(pathInput.value) !== 'string') {
      throw new Error('pathInput not set!');
    }

    return inputs;
  }

  protected async generateFiles(inputs: CommandInput[]) { 
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

  private mapSchematicOptions(inputs: CommandInput[]): SchematicOption[] {
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
  public async setPathInput(inputs: CommandInput[], options: CommandInput[], configuration: Configuration, schematicInput: CommandInput) {
    const sourceRootOption = this.getInput(options, 'sourceRoot');
    if (!sourceRootOption || typeof(sourceRootOption.value) !== 'string') {
      throw new Error('sourceRoot not found!');
    }
    let pathInput = this.getInput(inputs, 'path');
    if (!pathInput || typeof(pathInput.value) !== 'string') {
      const fsr = new FileSystemReader(process.cwd());
      if (typeof(schematicInput.value) === 'string' && configuration[schematicInput.value] && configuration[schematicInput.value].path ) {
        const currentDir = fsr.getDirname();
        const targetDir = fsr.getDirname(configuration[schematicInput.value].path);
        if (currentDir !== targetDir) {
          pathInput = this.setInput(inputs, 'path', join(sourceRootOption.value, configuration[schematicInput.value].path));
        }
      }
    } else {
      if(pathInput.value === '.') {
        pathInput.value = '';
      }
    }

    if (pathInput && typeof(pathInput.value) === 'string') {
      pathInput = this.setInput(inputs, 'path', normalize(pathInput.value));
    }

    return pathInput;
  }
}
