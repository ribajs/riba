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
                const dependencies = await this.readProjectIPackageJsonDependencies();
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
    async readProjectIPackageJsonDependencies() {
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
