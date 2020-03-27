"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
                child.stdout.on("data", (data) => resolve(data.toString().replace(/\r\n|\n/, "")));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QucnVubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9ydW5uZXJzL2Fic3RyYWN0LnJ1bm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQUMxQixpREFBa0U7QUFDbEUsdUNBQXVDO0FBRXZDLE1BQWEsY0FBYztJQUN6QixZQUFzQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7SUFFakMsS0FBSyxDQUFDLEdBQUcsQ0FDZCxPQUFlLEVBQ2YsT0FBTyxHQUFHLEtBQUssRUFDZixNQUFjLE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFFM0IsTUFBTSxJQUFJLEdBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxNQUFNLE9BQU8sR0FBaUI7WUFDNUIsR0FBRztZQUNILEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUztZQUNuQyxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUM7UUFDRixPQUFPLElBQUksT0FBTyxDQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNwRCxNQUFNLEtBQUssR0FBaUIscUJBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDbkUsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsS0FBSyxDQUFDLE1BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDaEMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQ2hELENBQUM7YUFDSDtZQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3pCLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtvQkFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2Y7cUJBQU07b0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FDWCxlQUFLLENBQUMsR0FBRyxDQUNQLGdCQUFRLENBQUMsc0JBQXNCLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQzdELENBQ0YsQ0FBQztvQkFDRixNQUFNLEVBQUUsQ0FBQztpQkFDVjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFuQ0Qsd0NBbUNDIn0=