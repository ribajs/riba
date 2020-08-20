"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractPackageManager = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QucGFja2FnZS1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9wYWNrYWdlLW1hbmFnZXJzL2Fic3RyYWN0LnBhY2thZ2UtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvRUFBbUU7QUFDbkUsa0RBQTBCO0FBQzFCLDJCQUE4QjtBQUM5Qiw4Q0FBc0I7QUFDdEIsK0JBQTRCO0FBRTVCLHVDQUF1QztBQU12QyxNQUFzQixzQkFBc0I7SUFDMUMsWUFBc0IsTUFBc0I7UUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7SUFBRyxDQUFDO0lBRXpDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBaUIsRUFBRSxjQUFzQjtRQUM1RCxNQUFNLE9BQU8sR0FBRyxhQUFHLENBQUM7WUFDbEIsT0FBTyxFQUFFO2dCQUNQLFFBQVEsRUFBRSxHQUFHO2dCQUNiLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO2FBQy9EO1lBQ0QsSUFBSSxFQUFFLGdCQUFRLENBQUMsd0NBQXdDO1NBQ3hELENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoQixJQUFJO1lBQ0YsTUFBTSxnQkFBZ0IsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxXQUFXLENBQUM7WUFDeEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLE1BQU0sbUJBQW1CLEdBQVcsbUJBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN6RCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUNuQixnQkFBZ0IsRUFDaEIsT0FBTyxFQUNQLFdBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsbUJBQW1CLENBQUMsQ0FDekMsQ0FBQztZQUNGLE9BQU8sQ0FBQyxPQUFPLEVBQUUs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