"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoCommand = void 0;
const abstract_command_1 = require("./abstract.command");
class InfoCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        program
            .command("info")
            .alias("i")
            .description("Display Riba CLI details")
            .action(async () => {
            await this.action.handle();
        });
    }
}
exports.InfoCommand = InfoCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2luZm8uY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx5REFBcUQ7QUFFckQsTUFBYSxXQUFZLFNBQVEsa0NBQWU7SUFDdkMsSUFBSSxDQUFDLE9BQXdCO1FBQ2xDLE9BQU87YUFDSixPQUFPLENBQUMsTUFBTSxDQUFDO2FBQ2YsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLFdBQVcsQ0FBQywwQkFBMEIsQ0FBQzthQUN2QyxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDakIsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNGO0FBVkQsa0NBVUMifQ==