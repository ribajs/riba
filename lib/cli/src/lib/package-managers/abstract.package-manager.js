"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
const ora = __importStar(require("ora"));
const path_1 = require("path");
const ui_1 = require("../ui");
class AbstractPackageManager {
    constructor(runner) {
        this.runner = runner;
    }
    async install(directory, packageManager) {
        const spinner = ora({
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
        const spinner = ora({
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
