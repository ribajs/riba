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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QucnVubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9ydW5uZXJzL2Fic3RyYWN0LnJ1bm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQUMxQixpREFBa0U7QUFDbEUsOEJBQWlDO0FBRWpDLE1BQWEsY0FBYztJQUN6QixZQUFzQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7SUFFakMsS0FBSyxDQUFDLEdBQUcsQ0FDZCxPQUFlLEVBQ2YsT0FBTyxHQUFHLEtBQUssRUFDZixNQUFjLE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFFM0IsTUFBTSxJQUFJLEdBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxNQUFNLE9BQU8sR0FBaUI7WUFDNUIsR0FBRztZQUNILEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUztZQUNuQyxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUM7UUFDRixPQUFPLElBQUksT0FBTyxDQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNwRCxNQUFNLEtBQUssR0FBaUIscUJBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDbkUsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsS0FBSyxDQUFDLE1BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUNoRCxDQUFDO2FBQ0g7WUFDRCxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDdkIsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO29CQUNkLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDZjtxQkFBTTtvQkFDTCxPQUFPLENBQUMsS0FBSyxDQUNYLGVBQUssQ0FBQyxHQUFHLENBQ1AsYUFBUSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUM3RCxDQUNGLENBQUM7b0JBQ0YsTUFBTSxFQUFFLENBQUM7aUJBQ1Y7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBbkNELHdDQW1DQyJ9