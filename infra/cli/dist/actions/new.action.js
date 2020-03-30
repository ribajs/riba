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
const index_1 = require("../interfaces/index");
const index_2 = require("../lib/configuration/index");
const index_3 = require("../lib/package-managers/index");
const index_4 = require("../lib/ui/index");
const git_runner_1 = require("../lib/runners/git.runner");
const index_5 = require("../lib/schematics/index");
const abstract_action_1 = require("./abstract.action");
const generate_action_1 = require("./generate.action");
exports.retrieveCols = () => {
    const defaultCols = 80;
    try {
        const terminalCols = child_process_1.execSync("tput cols", {
            stdio: ["pipe", "pipe", "ignore"],
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
        this.debug = debug_1.debug("actions:new");
        this.mapSchematicOptions = (options) => {
            return options.reduce((schematicOptions, option) => {
                if (option.name !== "skip-install" &&
                    option.value !== "package-manager") {
                    schematicOptions.push(new index_5.SchematicOption(option.name, option.value));
                }
                return schematicOptions;
            }, []);
        };
        this.print = (color = null) => (str = "") => {
            const terminalCols = exports.retrieveCols();
            // eslint-disable-next-line no-control-regex
            const strLength = str.replace(/\u001b\[[0-9]{2}m/g, "").length;
            const leftPaddingLength = Math.floor((terminalCols - strLength) / 2);
            const leftPadding = " ".repeat(Math.max(leftPaddingLength, 0));
            if (color) {
                str = chalk_1.default[color](str);
            }
            console.log(leftPadding, str);
        };
    }
    async handle(inputs, options) {
        await this.setDefaults(inputs, options);
        const projectDirectory = strings_1.dasherize(this.getInput(inputs, "name").value);
        const isDryRunEnabled = this.getInput(options, "dry-run").value;
        const shouldSkipInstall = this.getInput(options, "skip-install").value;
        const shouldSkipGit = this.getInput(options, "skip-git").value;
        const shouldSkipExamples = this.getInput(options, "skip-examples").value;
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
        console.info(index_4.messages.PROJECT_INFORMATION_START + "\n");
        const prompt = inquirer_1.createPromptModule();
        const nameCommandInput = this.getInput(inputs, "name");
        if (!nameCommandInput.value) {
            const message = index_4.messages.QUESTION_NAME_OF_NEW_PROJECT;
            const questions = [index_4.generateInput("name", message)("riba-app")];
            const answers = await prompt(questions);
            this.replaceCommandInputMissingInformation(inputs, answers);
        }
    }
    replaceCommandInputMissingInformation(inputs, answers) {
        return inputs.map((input) => (input.value =
            input.value !== undefined ? input.value : answers[input.name]));
    }
    async setDefaults(inputs, options) {
        const configuration = await this.loadConfiguration();
        this.setDefaultInput(options, "language", configuration.language);
        this.setDefaultInput(options, "sourceRoot", configuration.sourceRoot);
        this.setDefaultInput(options, "collection", configuration.collection);
        this.setDefaultInput(options, "templateEngine", configuration.templateEngine);
    }
    async generateFiles(inputs) {
        const collectionInput = this.getInput(inputs, "collection");
        if (!collectionInput || typeof collectionInput.value !== "string") {
            throw new Error("Unable to find a collection for this configuration");
        }
        const collection = new index_5.Collection(collectionInput.value);
        const schematicOptions = this.mapSchematicOptions(inputs);
        await collection.execute("application", schematicOptions);
    }
    /**
     * Calls some generation actions to generate example files
     * @param inputs
     * @param options
     */
    async generateExampleFiles(inputs, options) {
        console.log("generateExampleFiles");
        const projectNameInput = this.getInput(inputs, "name");
        if (!projectNameInput || typeof projectNameInput.value !== "string") {
            throw new Error("Unable to find name!");
        }
        const generateComponentAction = new generate_action_1.GenerateAction();
        const generateComponent = await this.getInputsForGenerateExamples(projectNameInput.value, inputs, options, generateComponentAction, "component");
        this.setInput(generateComponent.options, "flat", false);
        await generateComponentAction.handle(generateComponent.inputs, generateComponent.options);
        const generateBinderAction = new generate_action_1.GenerateAction();
        const generateBinder = await this.getInputsForGenerateExamples(projectNameInput.value, inputs, options, generateBinderAction, "binder");
        this.setInput(generateBinder.options, "flat", true);
        await generateBinderAction.handle(generateBinder.inputs, generateBinder.options);
        const generateFormatterAction = new generate_action_1.GenerateAction();
        const generateFormatter = await this.getInputsForGenerateExamples(projectNameInput.value, inputs, options, generateFormatterAction, "formatter");
        this.setInput(generateFormatter.options, "flat", true);
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
        const sourceRootInput = this.getInput(clonedOptions, "sourceRoot");
        if (!sourceRootInput || typeof sourceRootInput.value !== "string") {
            throw new Error("Unable to find a source root for this configuration!");
        }
        // inputs
        const schematicInput = this.setInput(clonedInputs, "schematic", schematic);
        if (!schematicInput || typeof schematicInput.value !== "string") {
            throw new Error("Schematic not set!");
        }
        const nameInput = this.setInput(clonedInputs, "name", name + "-example");
        if (!nameInput || typeof nameInput.value !== "string") {
            throw new Error("Unable to set name!");
        }
        const pathInput = await generateAction.setPathInput(clonedInputs, clonedOptions, configuration, schematicInput);
        if (!pathInput || typeof pathInput.value !== "string") {
            throw new Error("Unable to find path!");
        }
        const applicationSourceRoot = path_1.join(strings_1.dasherize(name));
        this.debug("applicationSourceRoot", applicationSourceRoot);
        // Set source root to new generated project
        this.setInput(clonedInputs, "path", path_1.join(applicationSourceRoot, pathInput.value));
        return {
            inputs: clonedInputs,
            options: clonedOptions,
        };
    }
    async installPackages(options, dryRunMode, installDirectory) {
        const inputPackageManager = this.getInput(options, "package-manager")
            .value;
        let packageManager;
        if (dryRunMode) {
            console.info("\n" + chalk_1.default.green(index_4.messages.DRY_RUN_MODE) + "\n");
            return;
        }
        if (typeof inputPackageManager === "string") {
            try {
                packageManager = index_3.PackageManagerFactory.create(inputPackageManager);
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
        return index_3.PackageManagerFactory.create(answers["package-manager"]);
    }
    async askForPackageManager() {
        const questions = [
            index_4.generateSelect("package-manager")(index_4.messages.PACKAGE_MANAGER_QUESTION)([
                index_1.PackageManager.NPM,
                index_1.PackageManager.YARN,
            ]),
        ];
        const prompt = inquirer_1.createPromptModule();
        return await prompt(questions);
    }
    async initializeGitRepository(dir) {
        const runner = new git_runner_1.GitRunner();
        await runner.run("init", true, path_1.join(process.cwd(), dir)).catch(() => {
            console.error(chalk_1.default.red(index_4.messages.GIT_INITIALIZATION_ERROR));
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
        const fileContent = content || index_2.defaultGitIgnore;
        const filePath = path_1.join(process.cwd(), dir, ".gitignore");
        return util_1.promisify(fs.writeFile)(filePath, fileContent);
    }
    printCollective() {
        const dim = this.print("dim");
        const yellow = this.print("yellow");
        const emptyLine = this.print();
        emptyLine();
        yellow(`Thanks for installing Riba ${index_4.emojis.WORKER}`);
        dim("We are always looking for interesting jobs");
        dim("or for help to maintain this package.");
        emptyLine();
        emptyLine();
        this.print()(`${chalk_1.default.bold(`${index_4.emojis.LETTER}  Contact:`)} ${chalk_1.default.underline("https://artandcode.studio/")}`);
        emptyLine();
    }
}
exports.NewAction = NewAction;
exports.exit = () => process.exit(1);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL25ldy5hY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQW1FO0FBQ25FLGtEQUEwQjtBQUMxQixpQ0FBdUM7QUFDdkMsaURBQXlDO0FBQ3pDLHVDQUF5QjtBQUN6Qix1Q0FBK0U7QUFDL0UsK0JBQTRCO0FBQzVCLCtCQUFpQztBQUNqQywrQ0FBbUU7QUFDbkUsc0RBQThEO0FBQzlELHlEQUd1QztBQUN2QywyQ0FLeUI7QUFDekIsMERBQXNEO0FBQ3RELG1EQUFzRTtBQUN0RSx1REFBbUQ7QUFDbkQsdURBQW1EO0FBRXRDLFFBQUEsWUFBWSxHQUFHLEdBQUcsRUFBRTtJQUMvQixNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDdkIsSUFBSTtRQUNGLE1BQU0sWUFBWSxHQUFHLHdCQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3pDLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUNILE9BQU8sUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxXQUFXLENBQUM7S0FDN0Q7SUFBQyxNQUFNO1FBQ04sT0FBTyxXQUFXLENBQUM7S0FDcEI7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFhLFNBQVUsU0FBUSxnQ0FBYztJQUE3Qzs7UUFDVSxVQUFLLEdBQUcsYUFBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBcU43Qix3QkFBbUIsR0FBRyxDQUM1QixPQUF1QixFQUNKLEVBQUU7WUFDckIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUNuQixDQUFDLGdCQUFtQyxFQUFFLE1BQW9CLEVBQUUsRUFBRTtnQkFDNUQsSUFDRSxNQUFNLENBQUMsSUFBSSxLQUFLLGNBQWM7b0JBQzlCLE1BQU0sQ0FBQyxLQUFLLEtBQUssaUJBQWlCLEVB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