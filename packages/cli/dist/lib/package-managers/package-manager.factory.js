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
        return new Promise((resolve) => {
            fs_1.readdir(process.cwd(), (error, files) => {
                if (error) {
                    resolve(this.create(interfaces_1.PackageManager.NPM));
                }
                else {
                    if (files.findIndex((filename) => filename === "yarn.lock") > -1) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZS1tYW5hZ2VyLmZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3BhY2thZ2UtbWFuYWdlcnMvcGFja2FnZS1tYW5hZ2VyLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQkFBNkI7QUFFN0IsK0RBQTBEO0FBQzFELGlEQUFrRDtBQUNsRCxpRUFBNEQ7QUFFNUQsTUFBYSxxQkFBcUI7SUFDekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUE2QjtRQUNoRCxRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssMkJBQWMsQ0FBQyxHQUFHO2dCQUNyQixPQUFPLElBQUksdUNBQWlCLEVBQUUsQ0FBQztZQUNqQyxLQUFLLDJCQUFjLENBQUMsSUFBSTtnQkFDdEIsT0FBTyxJQUFJLHlDQUFrQixFQUFFLENBQUM7WUFDbEM7Z0JBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDO1NBQzlEO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSTtRQUN0QixPQUFPLElBQUksT0FBTyxDQUF5QixDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3JELFlBQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksS0FBSyxFQUFFO29CQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLDJCQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDMUM7cUJBQU07b0JBQ0wsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLEtBQUssV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQ2hFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLDJCQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztxQkFDM0M7eUJBQU07d0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsMkJBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3FCQUMxQztpQkFDRjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUEzQkQsc0RBMkJDIn0=