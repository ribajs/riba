"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
const ora_1 = __importDefault(require("ora"));
const path_1 = require("path");
const ui_1 = require("../ui");
class AbstractPackageManager {
    constructor(runner) {
        this.runner = runner;
    }
    async install(directory, packageManager) {
        const spinner = ora_1.default({
            spinner: {
                interval: 120,
                frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
            },
            text: ui_1.messages.PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS,
        });
        spinner.start();
        try {
            const commandArguments = `${this.cli.install} --silent`;
            const collect = true;
            const dasherizedDirectory = strings_1.dasherize(directory);
            await this.runner.run(commandArguments, collect, path_1.join(process.cwd(), dasherizedDirectory));
            spinner.succeed();
            console.info();
            console.info(ui_1.messages.PACKAGE_MANAGER_INSTALLATION_SUCCEED(directory));
            console.info(ui_1.messages.GET_STARTED_INFORMATION);
            console.info();
            console.info(chalk_1.default.gray(ui_1.messages.CHANGE_DIR_COMMAND(directory)));
            console.info(chalk_1.default.gray(ui_1.messages.START_COMMAND(packageManager)));
            console.info();
        }
        catch {
            spinner.fail();
            console.error(chalk_1.default.red(ui_1.messages.PACKAGE_MANAGER_INSTALLATION_FAILED));
        }
    }
    async version() {
        const commandArguments = '--version';
        const collect = true;
        return this.runner.run(commandArguments, collect);
    }
    async addProduction(dependencies, tag) {
        const command = [this.cli.add, this.cli.saveFlag]
            .filter(i => i)
            .join(' ');
        const args = dependencies
            .map(dependency => `${dependency}@${tag}`)
            .join(' ');
        const spinner = ora_1.default({
            spinner: {
                interval: 120,
                frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
            },
            text: ui_1.messages.PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS,
        });
        spinner.start();
        try {
            await this.add(`${command} ${args}`);
            spinner.succeed();
        }
        catch {
            spinner.fail();
        }
    }
    async addDevelopment(dependencies, tag) {
        const command = `${this.cli.add} ${this.cli.saveDevFlag}`;
        const args = dependencies
            .map(dependency => `${dependency}@${tag}`)
            .join(' ');
        await this.add(`${command} ${args}`);
    }
    async add(commandArguments) {
        const collect = true;
        await this.runner.run(commandArguments, collect);
    }
    async getProduction() {
        const packageJsonContent = await this.readPackageJson();
        const packageJsonDependencies = packageJsonContent.dependencies;
        const dependencies = [];
        for (const [name, version] of Object.entries(packageJsonDependencies)) {
            dependencies.push({ name, version });
        }
        return dependencies;
    }
    async getDevelopement() {
        const packageJsonContent = await this.readPackageJson();
        const packageJsonDevDependencies = packageJsonContent.devDependencies;
        const dependencies = [];
        for (const [name, version] of Object.entries(packageJsonDevDependencies)) {
            dependencies.push({ name, version });
        }
        return dependencies;
    }
    async readPackageJson() {
        return new Promise((resolve, reject) => {
            fs_1.readFile(path_1.join(process.cwd(), 'package.json'), (error, buffer) => {
                if (error !== undefined && error !== null) {
                    reject(error);
                }
                else {
                    resolve(JSON.parse(buffer.toString()));
                }
            });
        });
    }
    async updateProduction(dependencies) {
        const commandArguments = `${this.cli.update} ${dependencies.join(' ')}`;
        await this.update(commandArguments);
    }
    async updateDevelopement(dependencies) {
        const commandArguments = `${this.cli.update} ${dependencies.join(' ')}`;
        await this.update(commandArguments);
    }
    async update(commandArguments) {
        const collect = true;
        await this.runner.run(commandArguments, collect);
    }
    async upgradeProduction(dependencies, tag) {
        await this.deleteProduction(dependencies);
        await this.addProduction(dependencies, tag);
    }
    async upgradeDevelopement(dependencies, tag) {
        await this.deleteDevelopment(dependencies);
        await this.addDevelopment(dependencies, tag);
    }
    async deleteProduction(dependencies) {
        const command = [this.cli.remove, this.cli.saveFlag]
            .filter(i => i)
            .join(' ');
        const args = dependencies.join(' ');
        await this.delete(`${command} ${args}`);
    }
    async deleteDevelopment(dependencies) {
        const commandArguments = `${this.cli.remove} ${this.cli.saveDevFlag} ${dependencies.join(' ')}`;
        await this.delete(commandArguments);
    }
    async delete(commandArguments) {
        const collect = true;
        await this.runner.run(commandArguments, collect);
    }
}
exports.AbstractPackageManager = AbstractPackageManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QucGFja2FnZS1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9wYWNrYWdlLW1hbmFnZXJzL2Fic3RyYWN0LnBhY2thZ2UtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9FQUFtRTtBQUNuRSxrREFBMEI7QUFDMUIsMkJBQThCO0FBQzlCLDhDQUFzQjtBQUN0QiwrQkFBNEI7QUFFNUIsOEJBQWlDO0FBR2pDLE1BQXNCLHNCQUFzQjtJQUMxQyxZQUFzQixNQUFzQjtRQUF0QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtJQUFHLENBQUM7SUFFekMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFpQixFQUFFLGNBQXNCO1FBQzVELE1BQU0sT0FBTyxHQUFHLGFBQUcsQ0FBQztZQUNsQixPQUFPLEVBQUU7Z0JBQ1AsUUFBUSxFQUFFLEdBQUc7Z0JBQ2IsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7YUFDL0Q7WUFDRCxJQUFJLEVBQUUsYUFBUSxDQUFDLHdDQUF3QztTQUN4RCxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDaEIsSUFBSTtZQUNGLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sV0FBVyxDQUFDO1lBQ3hELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQztZQUNyQixNQUFNLG1CQUFtQixHQUFXLG1CQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekQsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDbkIsZ0JBQWdCLEVBQ2hCLE9BQU8sRUFDUCxXQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLG1CQUFtQixDQUFDLENBQ3pDLENBQUM7WUFDRixPQUFPLENBQUMsT0FBTyxFQUFFLENB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