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
            // eslint-disable-next-line no-control-regex
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
    replaceCommandInputMissingInformation(inputs, answers) {
        return inputs.map(input => (input.value =
            input.value !== undefined ? input.value : answers[input.name]));
    }
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
    async selectPackageManager() {
        const answers = await this.askForPackageManager();
        return package_managers_1.PackageManagerFactory.create(answers['package-manager']);
    }
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
    async initializeGitRepository(dir) {
        const runner = new git_runner_1.GitRunner();
        await runner.run('init', true, path_1.join(process.cwd(), dir)).catch(() => {
            console.error(chalk_1.default.red(ui_1.messages.GIT_INITIALIZATION_ERROR));
        });
    }
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
}
exports.NewAction = NewAction;
exports.exit = () => process.exit(1);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL25ldy5hY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQW1FO0FBQ25FLGtEQUEwQjtBQUMxQixpQ0FBdUM7QUFDdkMsaURBQXlDO0FBQ3pDLHVDQUF5QjtBQUN6Qix1Q0FBK0U7QUFDL0UsK0JBQTRCO0FBQzVCLCtCQUFpQztBQUNqQyw4Q0FBNkQ7QUFDN0Qsd0RBQXdEO0FBQ3hELDhEQUF3RjtBQUN4RixrQ0FBNEU7QUFDNUUsMERBQXNEO0FBQ3RELGtEQUFnRTtBQUNoRSx1REFBbUQ7QUFDbkQsdURBQW1EO0FBRXRDLFFBQUEsWUFBWSxHQUFHLEdBQUcsRUFBRTtJQUMvQixNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDdkIsSUFBSTtRQUNGLE1BQU0sWUFBWSxHQUFHLHdCQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3pDLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUNILE9BQU8sUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxXQUFXLENBQUM7S0FDN0Q7SUFBQyxNQUFNO1FBQ04sT0FBTyxXQUFXLENBQUM7S0FDcEI7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFhLFNBQVUsU0FBUSxnQ0FBYztJQUE3Qzs7UUFDVSxVQUFLLEdBQUcsYUFBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBd0o3Qix3QkFBbUIsR0FBRyxDQUFDLE9BQXVCLEVBQXFCLEVBQUU7WUFDM0UsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUNuQixDQUFDLGdCQUFtQyxFQUFFLE1BQW9CLEVBQUUsRUFBRTtnQkFDNUQsSUFDRSxNQUFNLENBQUMsSUFBSSxLQUFLLGNBQWM7b0JBQzlCLE1BQU0sQ0FBQyxLQUFLLEtBQUssaUJBQWlCLEVB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