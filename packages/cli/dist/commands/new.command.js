"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_command_1 = require("./abstract.command");
class NewCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        program
            .command('new [name]')
            .alias('n')
            .description('Generate a new Riba application')
            .option('-e, --skip-examples', 'Allow to skip generation of example files.')
            .option('-d, --dry-run', 'Allow to test changes before execute command.')
            .option('-g, --skip-git', 'Allow to skip git repository initialization.')
            .option('-s, --skip-install', 'Allow to skip package installation.')
            .option('-p, --package-manager [packageManager]', 'Allow to specify package manager to skip package-manager selection.', 'npm')
            .option('-l, --language [language]', 'Specify ts or js language to use', 'ts')
            .option('-sl, --style-language [styleLanguage]', 'Specify css or scss style sheet language to use', 'scss')
            .option('-t, --template-engine [templateEngine]', 'Specify template engine to use', 'html')
            .option('-c, --collection [collectionName]', 'Specify the Collection that shall be used.')
            .action(async (name, command) => {
            const options = [];
            options.push({ name: 'dry-run', value: !!command.dryRun });
            options.push({ name: 'skip-git', value: !!command.skipGit });
            options.push({ name: 'skip-examples', value: !!command.skipExamples });
            options.push({ name: 'skip-install', value: !!command.skipInstall });
            options.push({ name: 'package-manager', value: command.packageManager });
            options.push({ name: 'language', value: command.language });
            options.push({ name: 'styleLanguage', value: command.styleLanguage });
            options.push({ name: 'templateEngine', value: command.templateEngine });
            options.push({ name: 'collection', value: command.collection });
            const inputs = [];
            inputs.push({ name: 'name', value: name });
            await this.action.handle(inputs, options);
        });
    }
}
exports.NewCommand = NewCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbmV3LmNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSx5REFBcUQ7QUFFckQsTUFBYSxVQUFXLFNBQVEsa0NBQWU7SUFDdEMsSUFBSSxDQUFDLE9BQXdCO1FBQ2xDLE9BQU87YUFDSixPQUFPLENBQUMsWUFBWSxDQUFDO2FBQ3JCLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixXQUFXLENBQUMsaUNBQWlDLENBQUM7YUFDOUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLDRDQUE0QyxDQUFDO2FBQzNFLE1BQU0sQ0FBQyxlQUFlLEVBQUUsK0NBQStDLENBQUM7YUFDeEUsTUFBTSxDQUFDLGdCQUFnQixFQUFFLDhDQUE4QyxDQUFDO2FBQ3hFLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxxQ0FBcUMsQ0FBQzthQUNuRSxNQUFNLENBQUMsd0NBQXdDLEVBQUUscUVBQXFFLEVBQUUsS0FBSyxDQUFDO2FBQzlILE1BQU0sQ0FBQywyQkFBMkIsRUFBRSxrQ0FBa0MsRUFBRSxJQUFJLENBQUM7YUFDN0UsTUFBTSxDQUFDLHVDQUF1QyxFQUFFLGlEQUFpRCxFQUFFLE1BQU0sQ0FBQzthQUMxRyxNQUFNLENBQUMsd0NBQXdDLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxDQUFDO2FBQzFGLE1BQU0sQ0FBQyxtQ0FBbUMsRUFBRSw0Q0FBNEMsQ0FBRTthQUMxRixNQUFNLENBQUMsS0FBSyxFQUFFLElBQVksRUFBRSxPQUFnQixFQUFFLEVBQUU7WUFDL0MsTUFBTSxPQUFPLEdBQW1CLEVBQUUsQ0FBQztZQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQzNELE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDN0QsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQ3JFLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1lBQ3pFLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUM1RCxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7WUFDdEUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7WUFDeEUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBRWhFLE1BQU0sTUFBTSxHQUFtQixFQUFFLENBQUM7WUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFFM0MsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0Y7QUFqQ0QsZ0NBaUNDIn0=