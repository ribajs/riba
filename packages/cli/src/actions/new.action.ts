import { dasherize } from '@angular-devkit/core/src/utils/strings';
import chalk from 'chalk';
import { debug as Debug } from 'debug';
import { execSync } from 'child_process';
import * as fs from 'fs';
import { Answers, Question, createPromptModule, PromptModule } from 'inquirer';
import { join } from 'path';
import { promisify } from 'util';
import { ICommandInput, PackageManager } from '../interfaces';
import { defaultGitIgnore, defaultConfiguration } from '../lib/configuration';
import { AbstractPackageManager, PackageManagerFactory } from '../lib/package-managers';
import { generateInput, generateSelect, messages, emojis } from '../lib/ui';
import { GitRunner } from '../lib/runners/git.runner';
import { Collection, SchematicOption } from '../lib/schematics';
import { AbstractAction } from './abstract.action';
import { GenerateAction } from './generate.action';

export class NewAction extends AbstractAction {
  private debug = Debug('actions:new');
  
  public async handle(inputs: ICommandInput[], options: ICommandInput[]) {
    const dryRunOption = options.find(option => option.name === 'dry-run');
    const isDryRunEnabled = dryRunOption && dryRunOption.value;

    inputs = await this.setDefaults(inputs);
    await this.askForMissingInformation(inputs);
    await this.generateFiles(this.concatOptions([inputs, options]));
    await this.generateExampleFiles(inputs, options);

    const shouldSkipInstall = options.some(
      option => option.name === 'skip-install' && option.value === true,
    );
    const shouldSkipGit = options.some(
      option => option.name === 'skip-git' && option.value === true,
    );
    const projectDirectory = dasherize(this.getInput(inputs, 'name')!.value as string);

    if (!shouldSkipInstall) {
      await this.installPackages(
        options,
        isDryRunEnabled as boolean,
        projectDirectory,
      );
    }
    if (!isDryRunEnabled) {
      if (!shouldSkipGit) {
        await this.initializeGitRepository(projectDirectory);
        await this.createGitIgnoreFile(projectDirectory);
      }

      this.printCollective();
    }
  }

  private async askForMissingInformation (inputs: ICommandInput[]) {
    console.info(messages.PROJECT_INFORMATION_START);
    console.info();

    const prompt: PromptModule = createPromptModule();
    const nameICommandInput = this.getInput(inputs, 'name');
    if (!nameICommandInput!.value) {
      const message = messages.QUESTION_NAME_OF_NEW_PROJECT;
      const questions = [generateInput('name', message)('riba-app')];
      const answers: Answers = await prompt(questions as ReadonlyArray<Question>);
      this.replaceICommandInputMissingInformation(inputs, answers);
    }
  };

  private replaceICommandInputMissingInformation(inputs: ICommandInput[], answers: Answers): ICommandInput[] {
    return inputs.map(
      input =>
        (input.value =
          input.value !== undefined ? input.value : answers[input.name]),
    );
  };

  protected async setDefaults(inputs: ICommandInput[]) {
    const configuration = await this.loadConfiguration();
    this.setDefaultInput(inputs, 'collection', configuration.collection);
    this.setDefaultInput(inputs, 'sourceRoot', configuration.sourceRoot);
    return inputs;
  }

  protected async generateFiles(inputs: ICommandInput[]) {
    this.debug('generateFiles inputs', inputs);
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
  protected async generateExampleFiles(inputs: ICommandInput[], options: ICommandInput[]) {
    this.debug('generateExampleFiles');
    const configuration = await this.loadConfiguration();
    const generateAction = new GenerateAction();
    const clonedInputs = this.deepCopyInput(inputs);
    const clonedOptions = this.deepCopyInput(options);
    const schematicInput = this.setInput(clonedInputs, 'schematic', 'component');
    if (!schematicInput || typeof(schematicInput.value) !== 'string') {
      throw new Error('Schematic not set!');
    }

    const sourceRootInput = this.getInput(clonedInputs, 'sourceRoot');
    if (!sourceRootInput || typeof(sourceRootInput.value) !== 'string') {
      throw new Error('Unable to find a source root for this configuration!');
    }

    const projectNameInput = this.getInput(inputs, 'name');
    if (!projectNameInput || typeof(projectNameInput.value) !== 'string') {
      throw new Error('Unable to find name!');
    }

    const nameInput = this.setInput(clonedInputs, 'name', projectNameInput.value + '-example');
    if (!nameInput || typeof(nameInput.value) !== 'string') {
      throw new Error('Unable to set name!');
    }

    const pathInput = await generateAction.setPathInput(clonedInputs, configuration, schematicInput);
    if (!pathInput || typeof(pathInput.value) !== 'string') {
      throw new Error('Unable to find path!');
    }

    const applicationSourceRoot = join(dasherize(projectNameInput.value), sourceRootInput.value);

    this.debug('applicationSourceRoot', applicationSourceRoot);

    // Set source root to new generated project
    this.setInput(clonedInputs, 'path', join(applicationSourceRoot, pathInput.value));

    this.debug('pathInput.value', pathInput.value);
    
    return generateAction.handle(clonedInputs, clonedOptions);
  }

  private mapSchematicOptions = (options: ICommandInput[]): SchematicOption[] => {
    return options.reduce(
      (schematicOptions: SchematicOption[], option: ICommandInput) => {
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

  private async installPackages (options: ICommandInput[], dryRunMode: boolean, installDirectory: string) {
    const inputPackageManager = this.getInput(options, 'package-manager')!.value;

    let packageManager: AbstractPackageManager;
    if (dryRunMode) {
      console.info();
      console.info(chalk.green(messages.DRY_RUN_MODE));
      console.info();
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