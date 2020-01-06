"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_command_1 = require("./abstract.command");
class InfoCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        program
            .command('info')
            .alias('i')
            .description('Display Riba CLI details')
            .action(async () => {
            await this.action.handle();
        });
    }
}
exports.InfoCommand = InfoCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2luZm8uY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUFxRDtBQUVyRCxNQUFhLFdBQVksU0FBUSxrQ0FBZTtJQUN2QyxJQUFJLENBQUMsT0FBd0I7UUFDbEMsT0FBTzthQUNKLE9BQU8sQ0FBQyxNQUFNLENBQUM7YUFDZixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsV0FBVyxDQUFDLDBCQUEwQixDQUFDO2FBQ3ZDLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNqQixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0Y7QUFWRCxrQ0FVQyJ9