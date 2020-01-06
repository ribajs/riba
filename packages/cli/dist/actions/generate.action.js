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
        const schematicInput = this.getInput(inputs, 'schematic');
        if (!schematicInput || typeof (schematicInput.value) !== 'string') {
            throw new Error('Unable to find a schematic for this configuration');
        }
        const configuration = await this.loadConfiguration();
        this.setDefaultInput(options, 'language', configuration.language);
        this.setDefaultInput(options, 'sourceRoot', configuration.sourceRoot);
        this.setDefaultInput(options, 'collection', configuration.collection);
        this.setDefaultInput(options, 'templateEngine', configuration.templateEngine);
        this.setDefaultInput(options, 'flat', configuration[schematicInput.value].flat);
        const pathInput = await this.setPathInput(inputs, options, configuration, schematicInput);
        if (!pathInput || typeof (pathInput.value) !== 'string') {
            throw new Error('pathInput not set!');
        }
        return inputs;
    }
    async generateFiles(inputs) {
        const collectionInput = this.getInput(inputs, 'collection');
        if (!collectionInput || typeof (collectionInput.value) !== 'string') {
            throw new Error('Unable to find a collection for this configuration');
        }
        const collection = new schematics_1.Collection(collectionInput.value);
        const schematicInput = this.getInput(inputs, 'schematic');
        if (!schematicInput || typeof (schematicInput.value) !== 'string') {
            throw new Error('Unable to find a schematic for this configuration');
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
        inputs.forEach(input => {
            if (input.name !== 'schematic' && input.value !== undefined) {
                this.schematicOptions.push(new schematics_1.SchematicOption(input.name, input.value));
            }
        });
        return this.schematicOptions;
    }
    ;
    /**
     * If no path is set and the current directory has not the name of the default directory name, only then set the default path
     * @param inputs
     * @param configuration
     * @param schematicInput
     */
    async setPathInput(inputs, options, configuration, schematicInput) {
        const sourceRootOption = this.getInput(options, 'sourceRoot');
        if (!sourceRootOption || typeof (sourceRootOption.value) !== 'string') {
            throw new Error('sourceRoot not found!');
        }
        let pathInput = this.getInput(inputs, 'path');
        if (!pathInput || typeof (pathInput.value) !== 'string') {
            const fsr = new readers_1.FileSystemReader(process.cwd());
            if (typeof (schematicInput.value) === 'string' && configuration[schematicInput.value] && configuration[schematicInput.value].path) {
                const currentDir = fsr.getDirname();
                const targetDir = fsr.getDirname(configuration[schematicInput.value].path);
                if (currentDir !== targetDir) {
                    pathInput = this.setInput(inputs, 'path', path_1.join(sourceRootOption.value, configuration[schematicInput.value].path));
                }
            }
        }
        else {
            if (pathInput.value === '.') {
                pathInput.value = '';
            }
        }
        if (pathInput && typeof (pathInput.value) === 'string') {
            pathInput = this.setInput(inputs, 'path', path_1.normalize(pathInput.value));
        }
        return pathInput;
    }
}
exports.GenerateAction = GenerateAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUuYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FjdGlvbnMvZ2VuZXJhdGUuYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBRTFCLHVEQUFtRDtBQUNuRCxrREFBZ0U7QUFDaEUsNENBQWtEO0FBQ2xELCtCQUF1QztBQUV2QyxNQUFhLGNBQWUsU0FBUSxnQ0FBYztJQUloRDtRQUNFLEtBQUssRUFBRSxDQUFDO1FBSFYscUJBQWdCLEdBQXNCLElBQUksS0FBSyxFQUFtQixDQUFDO0lBSW5FLENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQXNCLEVBQUUsT0FBdUI7UUFDakUsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN4QyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVTLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBc0IsRUFBRSxPQUF1QjtRQUN6RSxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsY0FBYyxJQUFJLE9BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQ2hFLE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztTQUN0RTtRQUVELE1BQU0sYUFBYSxHQUFrQixNQUFNLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXBFLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFF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