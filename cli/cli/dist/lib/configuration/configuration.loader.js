"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5sb2FkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQSxtRUFBK0Q7QUFFL0QsTUFBYSxtQkFBbUI7SUFDOUIsWUFBNkIsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBRyxDQUFDO0lBRXhDLEtBQUssQ0FBQyxJQUFJO1FBQ2YsTUFBTSxPQUFPLEdBQXVCLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDOUQsZ0JBQWdCO1lBQ2hCLGVBQWU7U0FDaEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sNENBQW9CLENBQUM7U0FDN0I7UUFDRCxPQUFPO1lBQ0wsR0FBRyw0Q0FBb0I7WUFDdkIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUN2QixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBaEJELGtEQWdCQyJ9