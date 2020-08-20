"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpmPackageManager = void 0;
const runners_1 = require("../runners");
const abstract_package_manager_1 = require("./abstract.package-manager");
const interfaces_1 = require("../../interfaces");
class NpmPackageManager extends abstract_package_manager_1.AbstractPackageManager {
    constructor() {
        super(runners_1.RunnerFactory.create(interfaces_1.Runner.NPM));
    }
    get name() {
        return interfaces_1.PackageManager.NPM.toUpperCase();
    }
    get cli() {
        return {
            install: "install",
            add: "install",
            update: "update",
            remove: "uninstall",
            saveFlag: "--save",
            saveDevFlag: "--save-dev",
        };
    }
}
exports.NpmPackageManager = NpmPackageManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnBhY2thZ2UtbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGFja2FnZS1tYW5hZ2Vycy9ucG0ucGFja2FnZS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUEyQztBQUUzQyx5RUFBb0U7QUFDcEUsaURBSTBCO0FBRTFCLE1BQWEsaUJBQWtCLFNBQVEsaURBQXNCO0lBQzNEO1FBQ0UsS0FBSyxDQUFDLHVCQUFhLENBQUMsTUFBTSxDQUFDLG1CQUFNLENBQUMsR0FBRyxDQUFjLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2IsT0FBTywyQkFBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsSUFBSSxHQUFHO1FBQ0wsT0FBTztZQUNMLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEdBQUcsRUFBRSxTQUFTO1lBQ2QsTUFBTSxFQUFFLFFBQVE7WUFDaEIsTUFBTSxFQUFFLFdBQVc7WUFDbkIsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLFlBQVk7U0FDMUIsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQW5CRCw4Q0FtQkMifQ==