"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const debug_1 = require("debug");
const abstract_action_1 = require("./abstract.action");
const schematics_1 = require("../lib/schematics");
const readers_1 = require("../lib/readers");
const path_1 = require("path");
class GenerateAction extends abstract_action_1.AbstractAction {
    constructor() {
        super();
        this.debug = debug_1.debug('actions:generate');
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
