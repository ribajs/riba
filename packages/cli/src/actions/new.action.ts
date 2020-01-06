import { dasherize } from '@angular-devkit/core/src/utils/strings';
import chalk from 'chalk';
import { debug as Debug } from 'debug';
import { execSync } from 'child_process';
import * as fs from 'fs';
import { Answers, Question, createPromptModule, PromptModule } from 'inquirer';
import { join } from 'path';
import { promisify } from 'util';
import { CommandInput, PackageManager } from '../interfaces';
import { defaultGitIgnore } from '../lib/configuration';
import { AbstractPackageManager, PackageManagerFactory } from '../lib/package-managers';
import { generateInput, generateSelect, messages, emojis } from '../lib/ui';
import { GitRunner } from '../lib/runners/git.runner';
import { Collection, SchematicOption } from '../lib/schematics';
import { AbstractAction } from './abstract.action';
import { GenerateAction } from './generate.action';

export class NewAction extends AbstractAction {
  private debug = Debug('actions:new');
  
  public async handle(inputs: CommandInput[], options: CommandInput[]) {
    await this.setDefaults(inputs, options);

    const projectDirectory = dasherize(this.getInput(inputs, 'name')!.value as string);
    const isDryRunEnabled = this.getInput(options, 'dry-run')!.value;
    const shouldSkipInstall = this.getInput(options, 'skip-install')!.value;
    const shouldSkipGit = this.getInput(options, 'skip-git')!.value;
    const shouldSkipExamples = this.getInput(options, 'skip-examples')!.value;

    await this.askForMissingInformation(inputs);

    await this.generateFiles(this.concatOptions([inputs, options]));
    if (!shouldSkipExamples) {
      await this.generateExampleFiles(inputs, options);
    }

    if (!shouldSkipInstall) {
      await this.installPackages(options, isDryRunEnabled as boolean, projectDirectory);
    }

    if (!isDryRunEnabled) {
      if (!shouldSkipGit) {
        await this.initializeGitRepository(projectDirectory);
        await this.createGitIgnoreFile(projectDirectory);
      }
      this.printCollective();
    }
  }

  private async askForMissingInformation (inputs: CommandInput[]) {
    console.info(messages.PROJECT_INFORMATION_START + '\n');

    const prompt: PromptModule = createPromptModule();
    const nameCommandInput = this.getInput(inputs, 'name');
    if (!nameCommandInput!.value) {
      const message = messages.QUESTION_NAME_OF_NEW_PROJECT;
      const questions = [generateInput('name', message)('riba-app')];
      const answers: Answers = await prompt(questions as ReadonlyArray<Question>);
      this.replaceCommandInputMissingInformation(inputs, answers);
    }
  };

  private replaceCommandInputMissingInformation(inputs: CommandInput[], answers: Answers): CommandInput[] {
    return inputs.map(
      input =>
        (input.value =
          input.value !== undefined ? input.value : answers[input.name]),
    );
  };

  protected async setDefaults(inputs: CommandInput[], options: CommandInput[]) {
    const configuration = await this.loadConfiguration();
    this.setDefaultInput(options, 'language', configuration.language);
    this.setDefaultInput(options, 'sourceRoot', configuration.sourceRoot);
    this.setDefaultInput(options, 'collection', configuration.collection);
    this.setDefaultInput(options, 'templateEngine', configuration.templateEngine);
  }

  protected async generateFiles(inputs: CommandInput[]) {
    const collectionInput = this.getInput(inputs, 'collection');
    if (!collectionInput || typeof(collectionInput.value) !== 'string') {
      throw new Error('Unable to find a collection for this configuration');
    }

    const collection = new Collection(collectionInput.value);

    const schematicOptions: SchematicOption[] = this.mapSchematicOptions(inputs);
    await collection.execute('application', schematicOptions);
  };

  /**
   * Calls some generation actions to generate example files
   * @param inputs 
   * @param options 
   */
  protected async generateExampleFiles(inputs: CommandInput[], options: CommandInput[]) {

    console.log('generateExampleFiles');

    const projectNameInput = this.getInput(inputs, 'name');
    if (!projectNameInput || typeof(projectNameInput.value) !== 'string') {
      throw new Error('Unable to find name!');
    }

    const generateComponentAction = new GenerateAction();
    const generateComponent = await this.getInputsForGenerateExamples(projectNameInput.value, inputs, options, generateComponentAction, 'component');
    this.setInput(generateComponent.options, 'flat', false);
    await generateComponentAction.handle(generateComponent.inputs, generateComponent.options);

    const generateBinderAction = new GenerateAction();
    const generateBinder = await this.getInputsForGenerateExamples(projectNameInput.value, inputs, options, generateBinderAction, 'binder');
    this.setInput(generateBinder.options, 'flat', true);
    await generateBinderAction.handle(generateBinder.inputs, generateBinder.options);

    const generateFormatterAction = new GenerateAction();
    const generateFormatter = await this.getInputsForGenerateExamples(projectNameInput.value, inputs, options, generateFormatterAction, 'formatter');
    this.setInput(generateFormatter.options, 'flat', true);
    await generateFormatterAction.handle(generateFormatter.inputs, generateFormatter.options);
  }

  /**
   * Set inputs and options to generate example files
   * @param inputs 
   * @param options 
   * @param generateAction 
   * @param schematic 
   */
  private async getInputsForGenerateExamples(name: string, inputs: CommandInput[], options: CommandInput[], generateAction: GenerateAction, schematic: string)  {
    const configuration = await this.loadConfiguration();

    const clonedInputs = this.deepCopyInput(inputs);
    const clonedOptions = this.deepCopyInput(options);

    // options

    const sourceRootInput = this.getInput(clonedOptions, 'sourceRoot');
    if (!sourceRootInput || typeof(sourceRootInput.value) !== 'string') {
      throw new Error('Unable to find a source root for this configuration!');
    }

    // inputs

    const schematicInput = this.setInput(clonedInputs, 'schematic', schematic);
    if (!schematicInput || typeof(schematicInput.value) !== 'string') {
      throw new Error('Schematic not set!');
    }

    const nameInput = this.setInput(clonedInputs, 'name', name + '-example');
    if (!nameInput || typeof(nameInput.value) !== 'string') {
      throw new Error('Unable to set name!');
    }

    const pathInput = await generateAction.setPathInput(clonedInputs, clonedOptions, configuration, schematicInput);
    if (!pathInput || typeof(pathInput.value) !== 'string') {
      throw new Error('Unable to find path!');
    }

    const applicationSourceRoot = join(dasherize(name));

    this.debug('applicationSourceRoot', applicationSourceRoot);

    // Set source root to new generated project
    this.setInput(clonedInputs, 'path', join(applicationSourceRoot, pathInput.value));

    return {
      inputs: clonedInputs,
      options: clonedOptions,
    }
  }

  private mapSchematicOptions = (options: CommandInput[]): SchematicOption[] => {
    return options.reduce(
      (schematicOptions: SchematicOption[], option: CommandInput) => {
        if (
          option.name !== 'skip-install' &&
          option.value !== 'package-manager'
        ) {
          schematicOptions.push(new SchematicOption(option.name, option.value));
        }
        return schematicOptions;
      },
      [],
    );
  };

  private async installPackages (options: CommandInput[], dryRunMode: boolean, installDirectory: string) {
    const inputPackageManager = this.getInput(options, 'package-manager')!.value;

    let packageManager: AbstractPackageManager;
    if (dryRunMode) {
      console.info('\n' + chalk.green(messages.DRY_RUN_MODE) + '\n');
      return;
    }
    if (typeof(inputPackageManager) === 'string') {
      try {
        packageManager = PackageManagerFactory.create(inputPackageManager);
        await packageManager.install(installDirectory, inputPackageManager);
      } catch (error) {
        if (error && error.message) {
          console.error(chalk.red(error.message));
        }
      }
    } else {
      packageManager = await this.selectPackageManager();
      await packageManager.install(
        installDirectory,
        packageManager.name.toLowerCase(),
      );
    }
  };

  private async selectPackageManager(): Promise<AbstractPackageManager> {
    const answers: Answers = await this.askForPackageManager();
    return PackageManagerFactory.create(answers['package-manager']);
  };

  private async askForPackageManager(): Promise<Answers> {
    const questions: Question[] = [
      generateSelect('package-manager')(messages.PACKAGE_MANAGER_QUESTION)([
        PackageManager.NPM,
        PackageManager.YARN,
      ]),
    ];
    const prompt = createPromptModule();
    return await prompt(questions);
  };

  private async initializeGitRepository(dir: string) {
    const runner = new GitRunner();
    await runner.run('init', true, join(process.cwd(), dir)).catch(() => {
      console.error(chalk.red(messages.GIT_INITIALIZATION_ERROR));
    });
  };

  /**
   * Write a file `.gitignore` in the root of the newly created project.
   * `.gitignore` available in `@nestjs/schematics` cannot be published to
   * NPM (needs to be investigated).
   *
   * @param dir Relative path to the project.
   * @param content (optional) Content written in the `.gitignore`.
   *
   * @return Resolves when succeeds, or rejects with any error from `fn.writeFile`.
   */
  private createGitIgnoreFile(dir: string, content?: string) {
    const fileContent = content || defaultGitIgnore;
    const filePath = join(process.cwd(), dir, '.gitignore');
    return promisify(fs.writeFile)(filePath, fileContent);
  };

  private printCollective() {
    const dim = this.print('dim');
    const yellow = this.print('yellow');
    const emptyLine = this.print();

    emptyLine();
    yellow(`Thanks for installing Riba ${emojis.WORKER}`);
    dim('We are always looking for interesting jobs');
    dim('or for help to maintain this package.');
    emptyLine();
    emptyLine();
    this.print()(
      `${chalk.bold(`${emojis.LETTER}  Contact:`)} ${chalk.underline(
        'https://artandcode.studio/',
      )}`,
    );
    emptyLine();
  };

  private print = (color: string | null = null) => (str = '') => {
    const terminalCols = retrieveCols();
    const strLength = str.replace(/\u001b\[[0-9]{2}m/g, '').length;
    const leftPaddingLength = Math.floor((terminalCols - strLength) / 2);
    const leftPadding = ' '.repeat(Math.max(leftPaddingLength, 0));
    if (color) {
      str = (chalk as any)[color](str);
    }
    console.log(leftPadding, str);
  };

}

export const retrieveCols = () => {
  const defaultCols = 80;
  try {
    const terminalCols = execSync('tput cols', {
      stdio: ['pipe', 'pipe', 'ignore'],
    });
    return parseInt(terminalCols.toString(), 10) || defaultCols;
  } catch {
    return defaultCols;
  }
};

export const exit = () => process.exit(1);
