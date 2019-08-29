"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const chalk_1 = __importDefault(require("chalk"));
const debug_1 = require("debug");
const child_process_1 = require("child_process");
const fs = __importStar(require("fs"));
const inquirer_1 = require("inquirer");
const path_1 = require("path");
const util_1 = require("util");
const interfaces_1 = require("../interfaces");
const configuration_1 = require("../lib/configuration");
const package_managers_1 = require("../lib/package-managers");
const ui_1 = require("../lib/ui");
const git_runner_1 = require("../lib/runners/git.runner");
const schematics_1 = require("../lib/schematics");
const abstract_action_1 = require("./abstract.action");
const generate_action_1 = require("./generate.action");
class NewAction extends abstract_action_1.AbstractAction {
    constructor() {
        super(...arguments);
        this.debug = debug_1.debug('actions:new');
        this.mapSchematicOptions = (options) => {
            return options.reduce((schematicOptions, option) => {
                if (option.name !== 'skip-install' &&
                    option.value !== 'package-manager') {
                    schematicOptions.push(new schematics_1.SchematicOption(option.name, option.value));
                }
                return schematicOptions;
            }, []);
        };
        this.print = (color = null) => (str = '') => {
            const terminalCols = exports.retrieveCols();
            const strLength = str.replace(/\u001b\[[0-9]{2}m/g, '').length;
            const leftPaddingLength = Math.floor((terminalCols - strLength) / 2);
            const leftPadding = ' '.repeat(Math.max(leftPaddingLength, 0));
            if (color) {
                str = chalk_1.default[color](str);
            }
            console.log(leftPadding, str);
        };
    }
    async handle(inputs, options) {
        await this.setDefaults(inputs, options);
        const projectDirectory = strings_1.dasherize(this.getInput(inputs, 'name').value);
        const isDryRunEnabled = this.getInput(options, 'dry-run').value;
        const shouldSkipInstall = this.getInput(options, 'skip-install').value;
        const shouldSkipGit = this.getInput(options, 'skip-git').value;
        const shouldSkipExamples = this.getInput(options, 'skip-examples').value;
        await this.askForMissingInformation(inputs);
        await this.generateFiles(this.concatOptions([inputs, options]));
        if (!shouldSkipExamples) {
            await this.generateExampleFiles(inputs, options);
        }
        if (!shouldSkipInstall) {
            await this.installPackages(options, isDryRunEnabled, projectDirectory);
        }
        if (!isDryRunEnabled) {
            if (!shouldSkipGit) {
                await this.initializeGitRepository(projectDirectory);
                await this.createGitIgnoreFile(projectDirectory);
            }
            this.printCollective();
        }
    }
    async askForMissingInformation(inputs) {
        console.info(ui_1.messages.PROJECT_INFORMATION_START + '\n');
        const prompt = inquirer_1.createPromptModule();
        const nameICommandInput = this.getInput(inputs, 'name');
        if (!nameICommandInput.value) {
            const message = ui_1.messages.QUESTION_NAME_OF_NEW_PROJECT;
            const questions = [ui_1.generateInput('name', message)('riba-app')];
            const answers = await prompt(questions);
            this.replaceICommandInputMissingInformation(inputs, answers);
        }
    }
    ;
    replaceICommandInputMissingInformation(inputs, answers) {
        return inputs.map(input => (input.value =
            input.value !== undefined ? input.value : answers[input.name]));
    }
    ;
    async setDefaults(inputs, options) {
        const configuration = await this.loadConfiguration();
        this.setDefaultInput(options, 'language', configuration.language);
        this.setDefaultInput(options, 'sourceRoot', configuration.sourceRoot);
        this.setDefaultInput(options, 'collection', configuration.collection);
        this.setDefaultInput(options, 'templateEngine', configuration.templateEngine);
    }
    async generateFiles(inputs) {
        const collectionInput = this.getInput(inputs, 'collection');
        if (!collectionInput || typeof (collectionInput.value) !== 'string') {
            throw new Error('Unable to find a collection for this configuration');
        }
        const collection = new schematics_1.Collection(collectionInput.value);
        const schematicOptions = this.mapSchematicOptions(inputs);
        await collection.execute('application', schematicOptions);
    }
    ;
    /**
     * Calls some generation actions to generate example files
     * @param inputs
     * @param options
     */
    async generateExampleFiles(inputs, options) {
        console.log('generateExampleFiles');
        const projectNameInput = this.getInput(inputs, 'name');
        if (!projectNameInput || typeof (projectNameInput.value) !== 'string') {
            throw new Error('Unable to find name!');
        }
        const generateComponentAction = new generate_action_1.GenerateAction();
        const generateComponent = await this.getInputsForGenerateExamples(projectNameInput.value, inputs, options, generateComponentAction, 'component');
        this.setInput(generateComponent.options, 'flat', false);
        await generateComponentAction.handle(generateComponent.inputs, generateComponent.options);
        const generateBinderAction = new generate_action_1.GenerateAction();
        const generateBinder = await this.getInputsForGenerateExamples(projectNameInput.value, inputs, options, generateBinderAction, 'binder');
        this.setInput(generateBinder.options, 'flat', true);
        await generateBinderAction.handle(generateBinder.inputs, generateBinder.options);
        const generateFormatterAction = new generate_action_1.GenerateAction();
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
    async getInputsForGenerateExamples(name, inputs, options, generateAction, schematic) {
        const configuration = await this.loadConfiguration();
        const clonedInputs = this.deepCopyInput(inputs);
        const clonedOptions = this.deepCopyInput(options);
        // options
        const sourceRootInput = this.getInput(clonedOptions, 'sourceRoot');
        if (!sourceRootInput || typeof (sourceRootInput.value) !== 'string') {
            throw new Error('Unable to find a source root for this configuration!');
        }
        // inputs
        const schematicInput = this.setInput(clonedInputs, 'schematic', schematic);
        if (!schematicInput || typeof (schematicInput.value) !== 'string') {
            throw new Error('Schematic not set!');
        }
        const nameInput = this.setInput(clonedInputs, 'name', name + '-example');
        if (!nameInput || typeof (nameInput.value) !== 'string') {
            throw new Error('Unable to set name!');
        }
        const pathInput = await generateAction.setPathInput(clonedInputs, clonedOptions, configuration, schematicInput);
        if (!pathInput || typeof (pathInput.value) !== 'string') {
            throw new Error('Unable to find path!');
        }
        const applicationSourceRoot = path_1.join(strings_1.dasherize(name));
        this.debug('applicationSourceRoot', applicationSourceRoot);
        // Set source root to new generated project
        this.setInput(clonedInputs, 'path', path_1.join(applicationSourceRoot, pathInput.value));
        return {
            inputs: clonedInputs,
            options: clonedOptions,
        };
    }
    async installPackages(options, dryRunMode, installDirectory) {
        const inputPackageManager = this.getInput(options, 'package-manager').value;
        let packageManager;
        if (dryRunMode) {
            console.info('\n' + chalk_1.default.green(ui_1.messages.DRY_RUN_MODE) + '\n');
            return;
        }
        if (typeof (inputPackageManager) === 'string') {
            try {
                packageManager = package_managers_1.PackageManagerFactory.create(inputPackageManager);
                await packageManager.install(installDirectory, inputPackageManager);
            }
            catch (error) {
                if (error && error.message) {
                    console.error(chalk_1.default.red(error.message));
                }
            }
        }
        else {
            packageManager = await this.selectPackageManager();
            await packageManager.install(installDirectory, packageManager.name.toLowerCase());
        }
    }
    ;
    async selectPackageManager() {
        const answers = await this.askForPackageManager();
        return package_managers_1.PackageManagerFactory.create(answers['package-manager']);
    }
    ;
    async askForPackageManager() {
        const questions = [
            ui_1.generateSelect('package-manager')(ui_1.messages.PACKAGE_MANAGER_QUESTION)([
                interfaces_1.PackageManager.NPM,
                interfaces_1.PackageManager.YARN,
            ]),
        ];
        const prompt = inquirer_1.createPromptModule();
        return await prompt(questions);
    }
    ;
    async initializeGitRepository(dir) {
        const runner = new git_runner_1.GitRunner();
        await runner.run('init', true, path_1.join(process.cwd(), dir)).catch(() => {
            console.error(chalk_1.default.red(ui_1.messages.GIT_INITIALIZATION_ERROR));
        });
    }
    ;
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
    createGitIgnoreFile(dir, content) {
        const fileContent = content || configuration_1.defaultGitIgnore;
        const filePath = path_1.join(process.cwd(), dir, '.gitignore');
        return util_1.promisify(fs.writeFile)(filePath, fileContent);
    }
    ;
    printCollective() {
        const dim = this.print('dim');
        const yellow = this.print('yellow');
        const emptyLine = this.print();
        emptyLine();
        yellow(`Thanks for installing Riba ${ui_1.emojis.WORKER}`);
        dim('We are always looking for interesting jobs');
        dim('or for help to maintain this package.');
        emptyLine();
        emptyLine();
        this.print()(`${chalk_1.default.bold(`${ui_1.emojis.LETTER}  Contact:`)} ${chalk_1.default.underline('https://artandcode.studio/')}`);
        emptyLine();
    }
    ;
}
exports.NewAction = NewAction;
exports.retrieveCols = () => {
    const defaultCols = 80;
    try {
        const terminalCols = child_process_1.execSync('tput cols', {
            stdio: ['pipe', 'pipe', 'ignore'],
        });
        return parseInt(terminalCols.toString(), 10) || defaultCols;
    }
    catch {
        return defaultCols;
    }
};
exports.exit = () => process.exit(1);
