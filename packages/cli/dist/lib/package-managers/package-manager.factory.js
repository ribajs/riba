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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZS1tYW5hZ2VyLmZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3BhY2thZ2UtbWFuYWdlcnMvcGFja2FnZS1tYW5hZ2VyLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQkFBNkI7QUFFN0IsK0RBQTBEO0FBQzFELGlEQUFrRDtBQUNsRCxpRUFBNEQ7QUFFNUQsTUFBYSxxQkFBcUI7SUFDekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUE2QjtRQUNoRCxRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssMkJBQWMsQ0FBQyxHQUFHO2dCQUNyQixPQUFPLElBQUksdUNBQWlCLEVBQUUsQ0FBQztZQUNqQyxLQUFLLDJCQUFjLENBQUMsSUFBSTtnQkFDdEIsT0FBTyxJQUFJLHlDQUFrQixFQUFFLENBQUM7WUFDbEM7Z0JBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDO1NBQzlEO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSTtRQUN0QixPQUFPLElBQUksT0FBTyxDQUF5QixPQUFPLENBQUMsRUFBRTtZQUNuRCxZQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN0QyxJQUFJLEtBQUssRUFBRTtvQkFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQywyQkFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQzFDO3FCQUFNO29CQUNMLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsS0FBSyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTt3QkFDOUQsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsMkJBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3FCQUMzQzt5QkFBTTt3QkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQywyQkFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQzFDO2lCQUNGO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTNCRCxzREEyQkMifQ==