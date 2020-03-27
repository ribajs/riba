"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
const os_1 = require("os");
const os_name_1 = __importDefault(require("os-name"));
const path_1 = require("path");
const index_1 = require("../lib/package-managers/index");
const index_2 = require("../lib/ui/index");
const abstract_action_1 = require("./abstract.action");
class InfoAction extends abstract_action_1.AbstractAction {
    constructor() {
        super(...arguments);
        this.displayRibaInformation = async () => {
            console.info(chalk_1.default.green("[Riba Information]"));
            try {
                const dependencies = await this.readProjectPackageJsonDependencies();
                this.displayRibaVersions(dependencies);
            }
            catch {
                console.error(chalk_1.default.red(index_2.messages.RIBA_INFORMATION_PACKAGE_MANAGER_FAILED));
            }
        };
    }
    async handle() {
        this.displayBanner();
        await this.displaySystemInformation();
        await this.displayRibaInformation();
    }
    displayBanner() {
        console.info(index_2.BANNER);
    }
    async displaySystemInformation() {
        console.info(chalk_1.default.green("[System Information]"));
        console.info("OS Version      :", chalk_1.default.yellow(os_name_1.default(os_1.platform(), os_1.release())));
        console.info("NodeJS Version  :", chalk_1.default.yellow(process.version));
        await this.displayPackageManagerVersion();
    }
    async displayPackageManagerVersion() {
        const manager = await index_1.PackageManagerFactory.find();
        try {
            const version = await manager.version();
            if (manager.name === "NPM") {
                console.info(`${manager.name} Version     :`, chalk_1.default.yellow(version));
            }
            else {
                console.info(`${manager.name} Version    :`, chalk_1.default.yellow(version));
            }
        }
        catch {
            console.error(`${manager.name} Version    :`, chalk_1.default.red("Unknown"));
        }
    }
    async readProjectPackageJsonDependencies() {
        return new Promise((resolve, reject) => {
            fs_1.readFile(path_1.join(process.cwd(), "package.json"), (error, buffer) => {
                if (error !== undefined && error !== null) {
                    reject(error);
                }
                else {
                    resolve(JSON.parse(buffer.toString()).dependencies);
                }
            });
        });
    }
    displayRibaVersions(dependencies) {
        this.buildRibaVersionsMessage(dependencies).forEach((dependency) => console.info(dependency.name, chalk_1.default.yellow(dependency.value)));
    }
    buildRibaVersionsMessage(dependencies) {
        const nestDependencies = this.collectNestDependencies(dependencies);
        return this.format(nestDependencies);
    }
    collectNestDependencies(dependencies) {
        const nestDependencies = [];
        Object.keys(dependencies).forEach((key) => {
            if (key.indexOf("@ribajs") > -1) {
                let name = `${key.replace(/@ribajs\//, "")} Version`;
                name = name.charAt(0).toUpperCase() + name.slice(1);
                nestDependencies.push({
                    name: name,
                    value: dependencies[key],
                });
            }
        });
        return nestDependencies;
    }
    format(dependencies) {
        const sorted = dependencies.sort((dependencyA, dependencyB) => dependencyB.name.length - dependencyA.name.length);
        const length = sorted[0].name.length;
        sorted.forEach((dependency) => {
            if (dependency.name.length < length) {
                dependency.name = this.rightPad(dependency.name, length);
            }
            dependency.name = dependency.name.concat(" :");
            dependency.value = dependency.value.replace(/(\^|~)/, "");
        });
        return sorted;
    }
    rightPad(name, length) {
        while (name.length < length) {
            name = name.concat(" ");
        }
        return name;
    }
}
exports.InfoAction = InfoAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5hY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWN0aW9ucy9pbmZvLmFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQUMxQiwyQkFBOEI7QUFDOUIsMkJBQXVDO0FBQ3ZDLHNEQUE2QjtBQUM3QiwrQkFBNEI7QUFDNUIseURBR3VDO0FBQ3ZDLDJDQUFtRDtBQUNuRCx1REFBbUQ7QUFHbkQsTUFBYSxVQUFXLFNBQVEsZ0NBQWM7SUFBOUM7O1FBbUNVLDJCQUFzQixHQUFHLEtBQUssSUFBSSxFQUFFO1lBQzFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSTtnQkFDRixNQUFNLFlBQVksR0FBNEIsTUFBTSxJQUFJLENBQUMsa0NBQWtDLEVBQUUsQ0FBQztnQkFDOUYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3hDO1lBQUMsTUFBTTtnQkFDTixPQUFPLENBQUMsS0FBSyxDQUNYLGVBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQVEsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUM1RCxDQUFDO2FBQ0g7UUFDSCxDQUFDLENBQUM7SUF1RUosQ0FBQztJQW5IUSxLQUFLLENBQUMsTUFBTTtRQUNqQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsTUFBTSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUN0QyxNQUFNLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFTyxhQUFhO1FBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVPLEtBQUssQ0FBQyx3QkFBd0I7UUFDcEMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztRQUNsRCxP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