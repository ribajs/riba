"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtLnBhY2thZ2UtbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGFja2FnZS1tYW5hZ2Vycy9ucG0ucGFja2FnZS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQTJDO0FBRTNDLHlFQUFvRTtBQUNwRSxpREFJMEI7QUFFMUIsTUFBYSxpQkFBa0IsU0FBUSxpREFBc0I7SUFDM0Q7UUFDRSxLQUFLLENBQUMsdUJBQWEsQ0FBQyxNQUFNLENBQUMsbUJBQU0sQ0FBQyxHQUFHLENBQWMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxJQUFXLElBQUk7UUFDYixPQUFPLDJCQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCxJQUFJLEdBQUc7UUFDTCxPQUFPO1lBQ0wsT0FBTyxFQUFFLFNBQVM7WUFDbEIsR0FBRyxFQUFFLFNBQVM7WUFDZCxNQUFNLEVBQUUsUUFBUTtZQUNoQixNQUFNLEVBQUUsV0FBVztZQUNuQixRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsWUFBWTtTQUMxQixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBbkJELDhDQW1CQyJ9