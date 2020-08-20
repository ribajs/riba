"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateAction = void 0;
const chalk_1 = __importDefault(require("chalk"));
const abstract_action_1 = require("./abstract.action");
const schematics_1 = require("../lib/schematics");
const readers_1 = require("../lib/readers");
const path_1 = require("path");
class GenerateAction extends abstract_action_1.AbstractAction {
    constructor() {
        super();
        this.schematicOptions = new Array();
    }
    async handle(inputs, options) {
        await this.setDefaults(inputs, options);
        await this.generateFiles(this.concatOptions([inputs, options]));
    }
    async setDefaults(inputs, options) {
        const schematicInput = this.getInput(inputs, "schematic");
        if (!schematicInput || typeof schematicInput.value !== "string") {
            throw new Error("Unable to find a schematic for this configuration");
        }
        const configuration = await this.loadConfiguration();
        this.setDefaultInput(options, "language", configuration.language);
        this.setDefaultInput(options, "sourceRoot", configuration.sourceRoot);
        this.setDefaultInput(options, "collection", configuration.collection);
        this.setDefaultInput(options, "templateEngine", configuration.templateEngine);
        this.setDefaultInput(options, "flat", configuration[schematicInput.value].flat);
        const pathInput = await this.setPathInput(inputs, options, configuration, schematicInput);
        if (!pathInput || typeof pathInput.value !== "string") {
            throw new Error("pathInput not set!");
        }
        return inputs;
    }
    async generateFiles(inputs) {
        const collectionInput = this.getInput(inputs, "collection");
        if (!collectionInput || typeof collectionInput.value !== "string") {
            throw new Error("Unable to find a collection for this configuration");
        }
        const collection = new schematics_1.Collection(collectionInput.value);
        const schematicInput = this.getInput(inputs, "schematic");
        if (!schematicInput || typeof schematicInput.value !== "string") {
            throw new Error("Unable to find a schematic for this configuration");
        }
        this.schematicOptions = this.mapSchematicOptions(inputs);
        try {
            await collection.execute(schematicInput.value, this.schematicOptions);
        }
        catch (error) {
            if (error && error.message) {
                console.error(chalk_1.default.red(error.message));
            }
        }
    }
    mapSchematicOptions(inputs) {
        inputs.forEach((input) => {
            if (input.name !== "schematic" && input.value !== undefined) {
                this.schematicOptions.push(new schematics_1.SchematicOption(input.name, input.value));
            }
        });
        return this.schematicOptions;
    }
    /**
     * If no path is set and the current directory has not the name of the default directory name, only then set the default path
     * @param inputs
     * @param configuration
     * @param schematicInput
     */
    async setPathInput(inputs, options, configuration, schematicInput) {
        const sourceRootOption = this.getInput(options, "sourceRoot");
        if (!sourceRootOption || typeof sourceRootOption.value !== "string") {
            throw new Error("sourceRoot not found!");
        }
        let pathInput = this.getInput(inputs, "path");
        if (!pathInput || typeof pathInput.value !== "string") {
            const fsr = new readers_1.FileSystemReader(process.cwd());
            if (typeof schematicInput.value === "string" &&
                configuration[schematicInput.value] &&
                configuration[schematicInput.value].path) {
                const currentDir = fsr.getDirname();
                const targetDir = fsr.getDirname(configuration[schematicInput.value].path);
                if (currentDir !== targetDir) {
                    pathInput = this.setInput(inputs, "path", path_1.join(sourceRootOption.value, configuration[schematicInput.value].path));
                }
            }
        }
        else {
            if (pathInput.value === ".") {
                pathInput.value = "";
            }
        }
        if (pathInput && typeof pathInput.value === "string") {
            pathInput = this.setInput(inputs, "path", path_1.normalize(pathInput.value));
        }
        return pathInput;
    }
}
exports.GenerateAction = GenerateAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUuYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FjdGlvbnMvZ2VuZXJhdGUuYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUEwQjtBQUUxQix1REFBbUQ7QUFDbkQsa0RBQWdFO0FBQ2hFLDRDQUFrRDtBQUNsRCwrQkFBdUM7QUFFdkMsTUFBYSxjQUFlLFNBQVEsZ0NBQWM7SUFHaEQ7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQUhWLHFCQUFnQixHQUFzQixJQUFJLEtBQUssRUFBbUIsQ0FBQztJQUluRSxDQUFDO0lBRU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFzQixFQUFFLE9BQXVCO1FBQ2pFLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDeEMsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFUyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQXNCLEVBQUUsT0FBdUI7UUFDekUsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLGNBQWMsSUFBSSxPQUFPLGNBQWMsQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQy9ELE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztTQUN0RTtRQUVELE1BQU0sYUFBYSxHQUFrQixNQUFNLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXBFLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FB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