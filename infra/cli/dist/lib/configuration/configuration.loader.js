"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationLoader = void 0;
const configuration_default_1 = require("./configuration.default");
class ConfigurationLoader {
    constructor(reader) {
        this.reader = reader;
    }
    async load() {
        const content = await this.reader.readAnyOf([
            ".riba-cli.json",
            "riba-cli.json",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5sb2FkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBTUEsbUVBQStEO0FBRS9ELE1BQWEsbUJBQW1CO0lBQzlCLFlBQTZCLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQztJQUV4QyxLQUFLLENBQUMsSUFBSTtRQUNmLE1BQU0sT0FBTyxHQUF1QixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQzlELGdCQUFnQjtZQUNoQixlQUFlO1NBQ2hCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLDRDQUFvQixDQUFDO1NBQzdCO1FBQ0QsT0FBTztZQUNMLEdBQUcsNENBQW9CO1lBQ3ZCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7U0FDdkIsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWhCRCxrREFnQkMifQ==