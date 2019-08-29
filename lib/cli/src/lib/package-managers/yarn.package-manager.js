"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runners_1 = require("../runners");
const abstract_package_manager_1 = require("./abstract.package-manager");
const interfaces_1 = require("../../interfaces");
class YarnPackageManager extends abstract_package_manager_1.AbstractPackageManager {
    constructor() {
        super(runners_1.RunnerFactory.create(interfaces_1.Runner.YARN));
    }
    get name() {
        return interfaces_1.PackageManager.YARN.toUpperCase();
    }
    get cli() {
        return {
            install: 'install',
            add: 'add',
            update: 'upgrade',
            remove: 'remove',
            saveFlag: '',
            saveDevFlag: '-D',
        };
    }
}
exports.YarnPackageManager = YarnPackageManager;
