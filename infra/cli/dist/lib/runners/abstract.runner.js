"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRunner = void 0;
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
const index_1 = require("../ui/index");
class AbstractRunner {
    constructor(binary) {
        this.binary = binary;
    }
    async run(command, collect = false, cwd = process.cwd()) {
        const args = [command];
        const options = {
            cwd,
            stdio: collect ? "pipe" : "inherit",
            shell: true,
        };
        return new Promise((resolve, reject) => {
            const child = child_process_1.spawn(`${this.binary}`, args, options);
            if (collect) {
                child.stdout?.on("data", (data) => resolve(data.toString().replace(/\r\n|\n/, "")));
            }
            child.on("close", (code) => {
                if (code === 0) {
                    resolve(null);
                }
                else {
                    console.error(chalk_1.default.red(index_1.messages.RUNNER_EXECUTION_ERROR(`${this.binary} ${command}`)));
                    reject();
                }
            });
        });
    }
}
exports.AbstractRunner = AbstractRunner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QucnVubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9ydW5uZXJzL2Fic3RyYWN0LnJ1bm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsaURBQWtFO0FBQ2xFLHVDQUF1QztBQUV2QyxNQUFhLGNBQWM7SUFDekIsWUFBc0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBRyxDQUFDO0lBRWpDLEtBQUssQ0FBQyxHQUFHLENBQ2QsT0FBZSxFQUNmLE9BQU8sR0FBRyxLQUFLLEVBQ2YsTUFBYyxPQUFPLENBQUMsR0FBRyxFQUFFO1FBRTNCLE1BQU0sSUFBSSxHQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsTUFBTSxPQUFPLEdBQWlCO1lBQzVCLEdBQUc7WUFDSCxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDbkMsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDO1FBQ0YsT0FBTyxJQUFJLE9BQU8sQ0FBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDcEQsTUFBTSxLQUFLLEdBQWlCLHFCQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ25FLElBQUksT0FBTyxFQUFFO2dCQUNYLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUNoRCxDQUFDO2FBQ0g7WUFDRCxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUN6QixJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7b0JBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNmO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxLQUFLLENBQ1gsZUFBSyxDQUFDLEdBQUcsQ0FDUCxnQkFBUSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUM3RCxDQUNGLENBQUM7b0JBQ0YsTUFBTSxFQUFFLENBQUM7aUJBQ1Y7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBbkNELHdDQW1DQyJ9