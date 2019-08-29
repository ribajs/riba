"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const npm_package_manager_1 = require("./npm.package-manager");
const interfaces_1 = require("../../interfaces");
const yarn_package_manager_1 = require("./yarn.package-manager");
class PackageManagerFactory {
    static create(name) {
        switch (name) {
            case interfaces_1.PackageManager.NPM:
                return new npm_package_manager_1.NpmPackageManager();
            case interfaces_1.PackageManager.YARN:
                return new yarn_package_manager_1.YarnPackageManager();
            default:
                throw new Error(`Package manager ${name} is not managed.`);
        }
    }
    static async find() {
        return new Promise(resolve => {
            fs_1.readdir(process.cwd(), (error, files) => {
                if (error) {
                    resolve(this.create(interfaces_1.PackageManager.NPM));
                }
                else {
                    if (files.findIndex(filename => filename === 'yarn.lock') > -1) {
                        resolve(this.create(interfaces_1.PackageManager.YARN));
                    }
                    else {
                        resolve(this.create(interfaces_1.PackageManager.NPM));
                    }
                }
            });
        });
    }
}
exports.PackageManagerFactory = PackageManagerFactory;
