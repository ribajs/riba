"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
const ui_1 = require("../ui");
class AbstractRunner {
    constructor(binary) {
        this.binary = binary;
    }
    async run(command, collect = false, cwd = process.cwd()) {
        const args = [command];
        const options = {
            cwd,
            stdio: collect ? 'pipe' : 'inherit',
            shell: true,
        };
        return new Promise((resolve, reject) => {
            const child = child_process_1.spawn(`${this.binary}`, args, options);
            if (collect) {
                child.stdout.on('data', data => resolve(data.toString().replace(/\r\n|\n/, '')));
            }
            child.on('close', code => {
                if (code === 0) {
                    resolve(null);
                }
                else {
                    console.error(chalk_1.default.red(ui_1.messages.RUNNER_EXECUTION_ERROR(`${this.binary} ${command}`)));
                    reject();
                }
            });
        });
    }
}
exports.AbstractRunner = AbstractRunner;
