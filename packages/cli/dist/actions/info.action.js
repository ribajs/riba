"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
const os_1 = require("os");
const osName = require("os-name");
const path_1 = require("path");
const package_managers_1 = require("../lib/package-managers");
const ui_1 = require("../lib/ui");
const abstract_action_1 = require("./abstract.action");
class InfoAction extends abstract_action_1.AbstractAction {
    constructor() {
        super(...arguments);
        this.displayRibaInformation = async () => {
            console.info(chalk_1.default.green('[Riba Information]'));
            try {
                const dependencies = await this.readProjectPackageJsonDependencies();
                this.displayRibaVersions(dependencies);
            }
            catch {
                console.error(chalk_1.default.red(ui_1.messages.RIBA_INFORMATION_PACKAGE_MANAGER_FAILED));
            }
        };
    }
    async handle() {
        this.displayBanner();
        await this.displaySystemInformation();
        await this.displayRibaInformation();
    }
    displayBanner() {
        console.info(ui_1.BANNER);
    }
    ;
    async displaySystemInformation() {
        console.info(chalk_1.default.green('[System Information]'));
        console.info('OS Version      :', chalk_1.default.yellow(osName(os_1.platform(), os_1.release())));
        console.info('NodeJS Version  :', chalk_1.default.yellow(process.version));
        await this.displayPackageManagerVersion();
    }
    ;
    async displayPackageManagerVersion() {
        const manager = await package_managers_1.PackageManagerFactory.find();
        try {
            const version = await manager.version();
            if (manager.name === 'NPM') {
                console.info(`${manager.name} Version     :`, chalk_1.default.yellow(version));
            }
            else {
                console.info(`${manager.name} Version    :`, chalk_1.default.yellow(version));
            }
        }
        catch {
            console.error(`${manager.name} Version    :`, chalk_1.default.red('Unknown'));
        }
    }
    ;
    async readProjectPackageJsonDependencies() {
        return new Promise((resolve, reject) => {
            fs_1.readFile(path_1.join(process.cwd(), 'package.json'), (error, buffer) => {
                if (error !== undefined && error !== null) {
                    reject(error);
                }
                else {
                    resolve(JSON.parse(buffer.toString()).dependencies);
                }
            });
        });
    }
    ;
    displayRibaVersions(dependencies) {
        this.buildRibaVersionsMessage(dependencies).forEach(dependency => console.info(dependency.name, chalk_1.default.yellow(dependency.value)));
    }
    buildRibaVersionsMessage(dependencies) {
        const nestDependencies = this.collectNestDependencies(dependencies);
        return this.format(nestDependencies);
    }
    ;
    collectNestDependencies(dependencies) {
        const nestDependencies = [];
        Object.keys(dependencies).forEach(key => {
            if (key.indexOf('@ribajs') > -1) {
                let name = `${key.replace(/@ribajs\//, '')} Version`;
                name = name.charAt(0).toUpperCase() + name.slice(1);
                nestDependencies.push({
                    name: name,
                    value: dependencies[key],
                });
            }
        });
        return nestDependencies;
    }
    ;
    format(dependencies) {
        const sorted = dependencies.sort((dependencyA, dependencyB) => dependencyB.name.length - dependencyA.name.length);
        const length = sorted[0].name.length;
        sorted.forEach(dependency => {
            if (dependency.name.length < length) {
                dependency.name = this.rightPad(dependency.name, length);
            }
            dependency.name = dependency.name.concat(' :');
            dependency.value = dependency.value.replace(/(\^|\~)/, '');
        });
        return sorted;
    }
    ;
    rightPad(name, length) {
        while (name.length < length) {
            name = name.concat(' ');
        }
        return name;
    }
    ;
}
exports.InfoAction = InfoAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5hY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWN0aW9ucy9pbmZvLmFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQUMxQiwyQkFBOEI7QUFDOUIsMkJBQXVDO0FBQ3ZDLGtDQUFtQztBQUNuQywrQkFBNEI7QUFDNUIsOERBR2lDO0FBQ2pDLGtDQUE2QztBQUM3Qyx1REFBbUQ7QUFHbkQsTUFBYSxVQUFXLFNBQVEsZ0NBQWM7SUFBOUM7O1FBaUNVLDJCQUFzQixHQUFHLEtBQUssSUFBSSxFQUFFO1lBQzFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSTtnQkFDRixNQUFNLFlBQVksR0FBNEIsTUFBTSxJQUFJLENBQUMsa0NBQWtDLEVBQUUsQ0FBQztnQkFDOUYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3hDO1lBQUMsTUFBTTtnQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsYUFBUSxDQUFDLHVDQUF1QyxDQUFDLENBQUMsQ0FBQzthQUM1RTtRQUNILENBQUMsQ0FBQztJQWtFSixDQUFDO0lBMUdRLEtBQUssQ0FBQyxNQUFNO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixNQUFNLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVPLGFBQWE7UUFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFNLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQUEsQ0FBQztJQUdNLEtBQUssQ0FBQyx3QkFBd0I7UUFDcEMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztRQUNsRCxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLGVBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQVEsRUFBRSxFQUFFLFlBQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9FLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsZUFBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNqRSxNQUFNLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFBQSxDQUFDO0lBRU0sS0FBSyxDQUFDLDRCQUE0QjtRQUN4QyxNQUFNLE9BQU8sR0FBMkIsTUFBTSx3Q0FBcUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzRSxJQUFJO1lBQ0YsTUFBTSxPQUFPLEdBQVcsTUFBTSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEQsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtnQkFDMUIsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLGdCQUFnQixFQUFFLGVBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUN0RTtpQkFBTTtnQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksZUFBZSxFQUFFLGVBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNyRTtTQUNGO1FBQUMsTUFBTTtZQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxlQUFlLEVBQUUsZUFBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO0lBQ0gsQ0FBQztJQUFBLENBQUM7SUFZTSxLQUFLLENBQUMsa0NBQWtDO1FBQzlDLE9BQU8sSUFBSSxPQUFPLENBQTBCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzlELGFBQVEsQ0FDTixXQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGNBQWMsQ0FBQyxFQUNuQyxDQUFDLEtBQW1DLEVBQUUsTUFBYyxFQUFFLEVBQUU7Z0JBQ3RELElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO29CQUN6QyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2Y7cUJBQU07b0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ3JEO1lBQ0gsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFBQSxDQUFDO0lBRU0sbUJBQW1CLENBQUMsWUFBcUM7UUFDL0QsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUMvRCxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsZUFBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDOUQsQ0FBQztJQUNKLENBQUM7SUFFTyx3QkFBd0IsQ0FBQyxZQUFxQztRQUNwRSxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQUEsQ0FBQztJQUVNLHVCQUF1QixDQUFDLFlBQXFDO1FBQ25FLE1BQU0sZ0JBQWdCLEdBQXFCLEVBQUUsQ0FBQztRQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0QyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQy9CLElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDckQsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDbkQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO29CQUNwQixJQUFJLEVBQUUsSUFBSTtvQkFDVixLQUFLLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQztpQkFDekIsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sZ0JBQWdCLENBQUM7SUFDMUIsQ0FBQztJQUFBLENBQUM7SUFFTSxNQUFNLENBQUMsWUFBOEI7UUFDM0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FDOUIsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FDM0IsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQ3BELENBQUM7UUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzFCLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFO2dCQUNuQyxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQzthQUMxRDtZQUNELFVBQVUsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsVUFBVSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQUEsQ0FBQztJQUVNLFFBQVEsQ0FBQyxJQUFZLEVBQUUsTUFBYztRQUMzQyxPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFO1lBQzNCLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQUEsQ0FBQztDQUVIO0FBM0dELGdDQTJHQyJ9