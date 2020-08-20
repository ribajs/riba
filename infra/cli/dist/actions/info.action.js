"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoAction = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5hY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWN0aW9ucy9pbmZvLmFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsMkJBQThCO0FBQzlCLDJCQUF1QztBQUN2QyxzREFBNkI7QUFDN0IsK0JBQTRCO0FBQzVCLHlEQUd1QztBQUN2QywyQ0FBbUQ7QUFDbkQsdURBQW1EO0FBR25ELE1BQWEsVUFBVyxTQUFRLGdDQUFjO0lBQTlDOztRQW1DVSwyQkFBc0IsR0FBRyxLQUFLLElBQUksRUFBRTtZQUMxQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUk7Z0JBQ0YsTUFBTSxZQUFZLEdBQTRCLE1BQU0sSUFBSSxDQUFDLGtDQUFrQyxFQUFFLENBQUM7Z0JBQzlGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN4QztZQUFDLE1BQU07Z0JBQ04sT0FBTyxDQUFDLEtBQUssQ0FDWCxlQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFRLENBQUMsdUNBQXVDLENBQUMsQ0FDNUQsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDO0lBdUVKLENBQUM7SUFuSFEsS0FBSyxDQUFDLE1BQU07UUFDakIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDdEMsTUFBTSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRU8sYUFBYTtRQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFTyxLQUFLLENBQUMsd0JBQXdCO1FBQ3BDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7UUFDbEQs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