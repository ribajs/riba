"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YarnPackageManager = void 0;
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
            install: "install",
            add: "add",
            update: "upgrade",
            remove: "remove",
            saveFlag: "",
            saveDevFlag: "-D",
        };
    }
}
exports.YarnPackageManager = YarnPackageManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFybi5wYWNrYWdlLW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3BhY2thZ2UtbWFuYWdlcnMveWFybi5wYWNrYWdlLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0NBQTJDO0FBRTNDLHlFQUFvRTtBQUNwRSxpREFJMEI7QUFFMUIsTUFBYSxrQkFBbUIsU0FBUSxpREFBc0I7SUFDNUQ7UUFDRSxLQUFLLENBQUMsdUJBQWEsQ0FBQyxNQUFNLENBQUMsbUJBQU0sQ0FBQyxJQUFJLENBQWUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxJQUFXLElBQUk7UUFDYixPQUFPLDJCQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFJLEdBQUc7UUFDTCxPQUFPO1lBQ0wsT0FBTyxFQUFFLFNBQVM7WUFDbEIsR0FBRyxFQUFFLEtBQUs7WUFDVixNQUFNLEVBQUUsU0FBUztZQUNqQixNQUFNLEVBQUUsUUFBUTtZQUNoQixRQUFRLEVBQUUsRUFBRTtZQUNaLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFuQkQsZ0RBbUJDIn0=