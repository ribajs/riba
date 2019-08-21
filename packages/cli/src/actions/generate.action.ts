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
    const schematicInput = this.getInput(inputs, 'schematic');


    if (!schematicInput || typeof(schematicInput.value) !== 'string') {
      throw new Error('Unable to find a schematic for this configuration');
    }

    this.setPathInput(inputs, configuration, schematicInput);

    this.schematicOptions = this.mapSchematicOptions(inputs);

    this.schematicOptions.push(
      new SchematicOption('language', configuration.language),
    );
    this.schematicOptions.push(
      new SchematicOption('sourceRoot', configuration.sourceRoot),
    );

    this.debug('schematic: ' + schematicInput.value);
    this.debug('options:', this.schematicOptions);

    try {
      await this.collection.execute(schematicInput.value, this.schematicOptions);
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

  private async loadConfiguration() {
    const loader: IConfigurationLoader = new ConfigurationLoader(
      new FileSystemReader(process.cwd()),
    );
    return loader.load();
  }

  /**
   * If no path is set and the current directory has not the name of the default directory name, only then set the default path
   * @param inputs
   * @param configuration
   * @param schematicInput
   */
  private async setPathInput(inputs: ICommandInput[], configuration: IConfiguration, schematicInput: ICommandInput) {
    const pathInput = this.getInput(inputs, 'path');
    if (!pathInput || !pathInput.value) {
      const fsr = new FileSystemReader(process.cwd());
      if (typeof(schematicInput.value) === 'string' && configuration[schematicInput.value] && configuration[schematicInput.value].path ) {
        const currentDir = fsr.getDirname();
        const targetDir = fsr.getDirname(configuration[schematicInput.value].path);
        if (currentDir !== targetDir) {
          this.schematicOptions.push(
            new SchematicOption('path', configuration[schematicInput.value].path),
          );
        }
      }
    } else {
      if(pathInput.value === '.') {
        pathInput.value = '';
      }
    }
  }
}
