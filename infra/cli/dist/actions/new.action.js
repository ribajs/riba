"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exit = exports.NewAction = exports.retrieveCols = void 0;
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
        const projectDirectory = strings_1.dasherize(this.getInput(inputs, "name")?.value);
        const isDryRunEnabled = this.getInput(options, "dry-run")?.value;
        const shouldSkipInstall = this.getInput(options, "skip-install")?.value;
        const shouldSkipGit = this.getInput(options, "skip-git")?.value;
        const shouldSkipExamples = this.getInput(options, "skip-examples")?.value;
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
        if (!nameCommandInput?.value) {
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
            ?.value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL25ldy5hY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUFtRTtBQUNuRSxrREFBMEI7QUFDMUIsaUNBQXVDO0FBQ3ZDLGlEQUF5QztBQUN6Qyx1Q0FBeUI7QUFDekIsdUNBQStFO0FBQy9FLCtCQUE0QjtBQUM1QiwrQkFBaUM7QUFDakMsK0NBQW1FO0FBQ25FLHNEQUE4RDtBQUM5RCx5REFHdUM7QUFDdkMsMkNBS3lCO0FBQ3pCLDBEQUFzRDtBQUN0RCxtREFBc0U7QUFDdEUsdURBQW1EO0FBQ25ELHVEQUFtRDtBQUV0QyxRQUFBLFlBQVksR0FBRyxHQUFHLEVBQUU7SUFDL0IsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLElBQUk7UUFDRixNQUFNLFlBQVksR0FBRyx3QkFBUSxDQUFDLFdBQVcsRUFBRTtZQUN6QyxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQztTQUNsQyxDQUFDLENBQUM7UUFDSCxPQUFPLFFBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUFDO0tBQzdEO0lBQUMsTUFBTTtRQUNOLE9BQU8sV0FBVyxDQUFDO0tBQ3BCO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsTUFBYSxTQUFVLFNBQVEsZ0NBQWM7SUFBN0M7O1FBQ1UsVUFBSyxHQUFHLGFBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQXFON0Isd0JBQW1CLEdBQUcsQ0FDNUIsT0FBdUIsRUFDSixFQUFFO1lBQ3JCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FDbkIsQ0FBQyxnQkFBbUMsRUFBRSxNQUFvQixFQUFFLEVBQUU7Z0JBQzVELElBQ0UsTUFBTSxDQUFDLElBQUksS0FBSyxjQUFjO29CQUM5QixNQUFNLENBQUMsS0FBSyxL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