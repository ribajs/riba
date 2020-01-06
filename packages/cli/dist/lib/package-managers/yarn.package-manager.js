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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFybi5wYWNrYWdlLW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3BhY2thZ2UtbWFuYWdlcnMveWFybi5wYWNrYWdlLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMkM7QUFFM0MseUVBQW9FO0FBQ3BFLGlEQUFrRjtBQUVsRixNQUFhLGtCQUFtQixTQUFRLGlEQUFzQjtJQUM1RDtRQUNFLEtBQUssQ0FBQyx1QkFBYSxDQUFDLE1BQU0sQ0FBQyxtQkFBTSxDQUFDLElBQUksQ0FBZSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNiLE9BQU8sMkJBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELElBQUksR0FBRztRQUNMLE9BQU87WUFDTCxPQUFPLEVBQUUsU0FBUztZQUNsQixHQUFHLEVBQUUsS0FBSztZQUNWLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLFFBQVEsRUFBRSxFQUFFO1lBQ1osV0FBVyxFQUFFLElBQUk7U0FDbEIsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQW5CRCxnREFtQkMifQ==