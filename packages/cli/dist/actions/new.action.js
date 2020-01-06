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
        const nameCommandInput = this.getInput(inputs, 'name');
        if (!nameCommandInput.value) {
            const message = ui_1.messages.QUESTION_NAME_OF_NEW_PROJECT;
            const questions = [ui_1.generateInput('name', message)('riba-app')];
            const answers = await prompt(questions);
            this.replaceCommandInputMissingInformation(inputs, answers);
        }
    }
    ;
    replaceCommandInputMissingInformation(inputs, answers) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL25ldy5hY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQW1FO0FBQ25FLGtEQUEwQjtBQUMxQixpQ0FBdUM7QUFDdkMsaURBQXlDO0FBQ3pDLHVDQUF5QjtBQUN6Qix1Q0FBK0U7QUFDL0UsK0JBQTRCO0FBQzVCLCtCQUFpQztBQUNqQyw4Q0FBNkQ7QUFDN0Qsd0RBQXdEO0FBQ3hELDhEQUF3RjtBQUN4RixrQ0FBNEU7QUFDNUUsMERBQXNEO0FBQ3RELGtEQUFnRTtBQUNoRSx1REFBbUQ7QUFDbkQsdURBQW1EO0FBRW5ELE1BQWEsU0FBVSxTQUFRLGdDQUFjO0lBQTdDOztRQUNVLFVBQUssR0FBRyxhQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUF3SjdCLHdCQUFtQixHQUFHLENBQUMsT0FBdUIsRUFBcUIsRUFBRTtZQUMzRSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQ25CLENBQUMsZ0JBQW1DLEVBQUUsTUFBb0IsRUFBRSxFQUFFO2dCQUM1RCxJQUNFLE1BQU0sQ0FBQyxJQUFJLEtBQUssY0FBYztvQkFDOUIsTUFBTSxDQUFDLEtBQUssS0FBSyxpQkFBaUIsRUFDbEM7b0JBQ0EsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksNEJBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUN2RTtnQkFDRCxPQUFPLGdCQUFnQixDQUFDO1lBQzFCLENBQUMsRUFDRCxFQUFFLENBQ0gsQ0FBQztRQUNKLENBQUMsQ0FBQztRQXNGTSxVQUFLLEdBQUcsQ0FBQyxRQUF1QixJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxFQUFFO1lBQzVELE1BQU0sWUFBWSxHQUFHLG9CQUFZLEVBQUUsQ0FBQztZQUNwQyxNQUFNLFNBQVMsR0FB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