"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_1 = require("../lib/configuration");
const readers_1 = require("../lib/readers");
class AbstractAction {
    deepCopyInput(inputs) {
        return inputs.map(input => ({ ...input }));
    }
    getInput(inputs, name) {
        const input = inputs.find(input => input.name === name);
        return input;
    }
    setInput(inputs, name, value) {
        const input = inputs.find(input => input.name === name);
        // Add new input if input not exists
        if (!input) {
            inputs.push({ name, value });
            return this.getInput(inputs, name);
        }
        input.value = value;
        return input;
    }
    /**
     * Sets input if value only if the value has not yet been set
     * @param inputs
     * @param name
     * @param value
     */
    setDefaultInput(inputs, name, value) {
        const input = inputs.find(input => input.name === name);
        if (!input) {
            inputs.push({ name, value });
            return this.getInput(inputs, name);
        }
        if (typeof (input.value) === 'undefined') {
            input.value = value;
        }
        return input;
    }
    concatOptions(inputsSources) {
        const result = new Array();
        for (const inputs of inputsSources) {
            const toConcat = this.deepCopyInput(inputs);
            for (const input of toConcat) {
                if (typeof (input.value) !== 'undefined') {
                    this.setInput(result, input.name, input.value);
                }
            }
        }
        return result;
    }
    async loadConfiguration() {
        const loader = new configuration_1.ConfigurationLoader(new readers_1.FileSystemReader(process.cwd()));
        return loader.load();
    }
    async generateFiles(args, options) {
        return Promise.resolve();
    }
}
exports.AbstractAction = AbstractAction;
