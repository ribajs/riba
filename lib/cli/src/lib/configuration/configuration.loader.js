"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_default_1 = require("./configuration.default");
class ConfigurationLoader {
    constructor(reader) {
        this.reader = reader;
    }
    async load() {
        const content = await this.reader.readAnyOf([
            '.riba-cli.json',
            'riba-cli.json',
        ]);
        if (!content) {
            return configuration_default_1.defaultConfiguration;
        }
        return {
            ...configuration_default_1.defaultConfiguration,
            ...JSON.parse(content),
        };
    }
}
exports.ConfigurationLoader = ConfigurationLoader;
