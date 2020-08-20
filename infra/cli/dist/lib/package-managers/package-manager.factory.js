"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageManagerFactory = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZS1tYW5hZ2VyLmZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3BhY2thZ2UtbWFuYWdlcnMvcGFja2FnZS1tYW5hZ2VyLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkJBQTZCO0FBRTdCLCtEQUEwRDtBQUMxRCxpREFBa0Q7QUFDbEQsaUVBQTREO0FBRTVELE1BQWEscUJBQXFCO0lBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBNkI7UUFDaEQsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLDJCQUFjLENBQUMsR0FBRztnQkFDckIsT0FBTyxJQUFJLHVDQUFpQixFQUFFLENBQUM7WUFDakMsS0FBSywyQkFBYyxDQUFDLElBQUk7Z0JBQ3RCLE9BQU8sSUFBSSx5Q0FBa0IsRUFBRSxDQUFDO1lBQ2xDO2dCQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLElBQUksa0JBQWtCLENBQUMsQ0FBQztTQUM5RDtJQUNILENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUk7UUFDdEIsT0FBTyxJQUFJLE9BQU8sQ0FBeUIsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNyRCxZQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN0QyxJQUFJLEtBQUssRUFBRTtvQkFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQywyQkFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQzFDO3FCQUFNO29CQUNMLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxLQUFLLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO3dCQUNoRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQywyQkFBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7cUJBQzNDO3lCQUFNO3dCQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLDJCQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztxQkFDMUM7aUJBQ0Y7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBM0JELHNEQTJCQyJ9