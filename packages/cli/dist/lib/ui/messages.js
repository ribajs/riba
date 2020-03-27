"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const emojis_1 = require("./emojis");
exports.messages = {
    DRY_RUN_MODE: "Command has been executed in the dry mode, nothing changed!",
    PROJECT_INFORMATION_START: `${emojis_1.emojis.ZAP}  We will scaffold your app in a few seconds..`,
    RUNNER_EXECUTION_ERROR: (command) => `\nFailed to execute command: ${command}`,
    PACKAGE_MANAGER_QUESTION: `Which package manager would you ${emojis_1.emojis.HEART} to use?`,
    PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS: `Installation in progress... ${emojis_1.emojis.COFFEE}`,
    // PACKAGE_MANAGER_UPDATE_IN_PROGRESS: `Installation in progress... ${emojis.COFFEE}`,
    // PACKAGE_MANAGER_UPGRADE_IN_PROGRESS: `Installation in progress... ${emojis.COFFEE}`,
    GIT_INITIALIZATION_ERROR: "Git repository has not been initialized",
    PACKAGE_MANAGER_INSTALLATION_SUCCEED: (name) => `${emojis_1.emojis.ROCKET}  Successfully created project ${chalk_1.default.green(name)}`,
    GET_STARTED_INFORMATION: `${emojis_1.emojis.POINT_RIGHT}  Get started with the following commands:`,
    CHANGE_DIR_COMMAND: (name) => `$ cd ${name}`,
    START_COMMAND: (name) => `$ ${name} run start`,
    PACKAGE_MANAGER_INSTALLATION_FAILED: `${emojis_1.emojis.SCREAM}  Packages installation failed, see above`,
    // tslint:disable-next-line:max-line-length
    RIBA_INFORMATION_PACKAGE_MANAGER_FAILED: `${emojis_1.emojis.SMIRK}  cannot read your project package.json file, are you inside your project directory?`,
    QUESTION_NAME_OF_NEW_PROJECT: `What name would you like to use for the ${emojis_1.emojis.CHICK}  project? `,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3VpL21lc3NhZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLHFDQUFrQztBQUVyQixRQUFBLFFBQVEsR0FBRztJQUN0QixZQUFZLEVBQUUsNkRBQTZEO0lBQzNFLHlCQUF5QixFQUFFLEdBQUcsZUFBTSxDQUFDLEdBQUcsZ0RBQWdEO0lBQ3hGLHNCQUFzQixFQUFFLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FDMUMsZ0NBQWdDLE9BQU8sRUFBRTtJQUMzQyx3QkFBd0IsRUFBRSxtQ0FBbUMsZUFBTSxDQUFDLEtBQUssVUFBVTtJQUNuRix3Q0FBd0MsRUFBRSwrQkFBK0IsZUFBTSxDQUFDLE1BQU0sRUFBRTtJQUN4RixzRkFBc0Y7SUFDdEYsdUZBQXVGO0lBQ3ZGLHdCQUF3QixFQUFFLHlDQUF5QztJQUNuRSxvQ0FBb0MsRUFBRSxDQUFDLElBQVksRUFBRSxFQUFFLENBQ3JELEdBQUcsZUFBTSxDQUFDLE1BQU0sa0NBQWtDLGVBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDdkUsdUJBQXVCLEVBQUUsR0FBRyxlQUFNLENBQUMsV0FBVyw0Q0FBNEM7SUFDMUYsa0JBQWtCLEVBQUUsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLFFBQVEsSUFBSSxFQUFFO0lBQ3BELGFBQWEsRUFBRSxDQUFDLElBQVksRUFBRSxFQUFFLENBQUMsS0FBSyxJQUFJLFlBQVk7SUFDdEQsbUNBQW1DLEVBQUUsR0FBRyxlQUFNLENBQUMsTUFBTSwyQ0FBMkM7SUFDaEcsMkNBQTJDO0lBQzNDLHVDQUF1QyxFQUFFLEdBQUcsZUFBTSxDQUFDLEtBQUssc0ZBQXNGO0lBQzlJLDRCQUE0QixFQUFFLDJDQUEyQyxlQUFNLENBQUMsS0FBSyxhQUFhO0NBQ25HLENBQUMifQ==