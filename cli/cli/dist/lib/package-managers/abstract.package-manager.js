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
const index_1 = require("../ui/index");
class AbstractPackageManager {
    constructor(runner) {
        this.runner = runner;
    }
    async install(directory, packageManager) {
        const spinner = ora_1.default({
            spinner: {
                interval: 120,
                frames: ["▹▹▹▹▹", "▸▹▹▹▹", "▹▸▹▹▹", "▹▹▸▹▹", "▹▹▹▸▹", "▹▹▹▹▸"],
            },
            text: index_1.messages.PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS,
        });
        spinner.start();
        try {
            const commandArguments = `${this.cli.install} --silent`;
            const collect = true;
            const dasherizedDirectory = strings_1.dasherize(directory);
            await this.runner.run(commandArguments, collect, path_1.join(process.cwd(), dasherizedDirectory));
            spinner.succeed();
            console.info();
            console.info(index_1.messages.PACKAGE_MANAGER_INSTALLATION_SUCCEED(directory));
            console.info(index_1.messages.GET_STARTED_INFORMATION);
            console.info();
            console.info(chalk_1.default.gray(index_1.messages.CHANGE_DIR_COMMAND(directory)));
            console.info(chalk_1.default.gray(index_1.messages.START_COMMAND(packageManager)));
            console.info();
        }
        catch {
            spinner.fail();
            console.error(chalk_1.default.red(index_1.messages.PACKAGE_MANAGER_INSTALLATION_FAILED));
        }
    }
    async version() {
        const commandArguments = "--version";
        const collect = true;
        return this.runner.run(commandArguments, collect);
    }
    async addProduction(dependencies, tag) {
        const command = [this.cli.add, this.cli.saveFlag]
            .filter((i) => i)
            .join(" ");
        const args = dependencies
            .map((dependency) => `${dependency}@${tag}`)
            .join(" ");
        const spinner = ora_1.default({
            spinner: {
                interval: 120,
                frames: ["▹▹▹▹▹", "▸▹▹▹▹", "▹▸▹▹▹", "▹▹▸▹▹", "▹▹▹▸▹", "▹▹▹▹▸"],
            },
            text: index_1.messages.PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS,
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
            .map((dependency) => `${dependency}@${tag}`)
            .join(" ");
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
            fs_1.readFile(path_1.join(process.cwd(), "package.json"), (error, buffer) => {
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
        const commandArguments = `${this.cli.update} ${dependencies.join(" ")}`;
        await this.update(commandArguments);
    }
    async updateDevelopement(dependencies) {
        const commandArguments = `${this.cli.update} ${dependencies.join(" ")}`;
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
            .filter((i) => i)
            .join(" ");
        const args = dependencies.join(" ");
        await this.delete(`${command} ${args}`);
    }
    async deleteDevelopment(dependencies) {
        const commandArguments = `${this.cli.remove} ${this.cli.saveDevFlag} ${dependencies.join(" ")}`;
        await this.delete(commandArguments);
    }
    async delete(commandArguments) {
        const collect = true;
        await this.runner.run(commandArguments, collect);
    }
}
exports.AbstractPackageManager = AbstractPackageManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QucGFja2FnZS1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9wYWNrYWdlLW1hbmFnZXJzL2Fic3RyYWN0LnBhY2thZ2UtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9FQUFtRTtBQUNuRSxrREFBMEI7QUFDMUIsMkJBQThCO0FBQzlCLDhDQUFzQjtBQUN0QiwrQkFBNEI7QUFFNUIsdUNBQXVDO0FBTXZDLE1BQXNCLHNCQUFzQjtJQUMxQyxZQUFzQixNQUFzQjtRQUF0QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtJQUFHLENBQUM7SUFFekMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFpQixFQUFFLGNBQXNCO1FBQzVELE1BQU0sT0FBTyxHQUFHLGFBQUcsQ0FBQztZQUNsQixPQUFPLEVBQUU7Z0JBQ1AsUUFBUSxFQUFFLEdBQUc7Z0JBQ2IsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7YUFDL0Q7WUFDRCxJQUFJLEVBQUUsZ0JBQVEsQ0FBQyx3Q0FBd0M7U0FDeEQsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hCLElBQUk7WUFDRixNQUFNLGdCQUFnQixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLFdBQVcsQ0FBQztZQUN4RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDckIsTUFBTSxtQkFBbUIsR0FBVyxtQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQ25CLGdCQUFnQixFQUNoQixPQUFPLEVBQ1AsV0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxtQkFBbUIsQ0FBQyxDQUN6QyxDQUFDO1lBQ0YsT0FBTyxDQUFDLE9BQU8sRUFBRSxD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