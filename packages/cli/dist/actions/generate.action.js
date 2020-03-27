"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUuYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FjdGlvbnMvZ2VuZXJhdGUuYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBRTFCLHVEQUFtRDtBQUNuRCxrREFBZ0U7QUFDaEUsNENBQWtEO0FBQ2xELCtCQUF1QztBQUV2QyxNQUFhLGNBQWUsU0FBUSxnQ0FBYztJQUdoRDtRQUNFLEtBQUssRUFBRSxDQUFDO1FBSFYscUJBQWdCLEdBQXNCLElBQUksS0FBSyxFQUFtQixDQUFDO0lBSW5FLENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQXNCLEVBQUUsT0FBdUI7UUFDakUsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN4QyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVTLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBc0IsRUFBRSxPQUF1QjtRQUN6RSxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsY0FBYyxJQUFJLE9BQU8sY0FBYyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDL0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsTUFBTSxhQUFhLEdBQWtCLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFcEUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFD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