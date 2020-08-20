"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewCommand = void 0;
const abstract_command_1 = require("./abstract.command");
class NewCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        program
            .command("new [name]")
            .alias("n")
            .description("Generate a new Riba application")
            .option("-e, --skip-examples", "Allow to skip generation of example files.")
            .option("-d, --dry-run", "Allow to test changes before execute command.")
            .option("-g, --skip-git", "Allow to skip git repository initialization.")
            .option("-s, --skip-install", "Allow to skip package installation.")
            .option("-p, --package-manager [packageManager]", "Allow to specify package manager to skip package-manager selection.", "npm")
            .option("-l, --language [language]", "Specify ts or js language to use", "ts")
            .option("-sl, --style-language [styleLanguage]", "Specify css or scss style sheet language to use", "scss")
            .option("-t, --template-engine [templateEngine]", "Specify template engine to use", "html")
            .option("-c, --collection [collectionName]", "Specify the Collection that shall be used.")
            .action(async (name, command) => {
            const options = [];
            options.push({ name: "dry-run", value: !!command.dryRun });
            options.push({ name: "skip-git", value: !!command.skipGit });
            options.push({ name: "skip-examples", value: !!command.skipExamples });
            options.push({ name: "skip-install", value: !!command.skipInstall });
            options.push({
                name: "package-manager",
                value: command.packageManager,
            });
            options.push({ name: "language", value: command.language });
            options.push({ name: "styleLanguage", value: command.styleLanguage });
            options.push({ name: "templateEngine", value: command.templateEngine });
            options.push({ name: "collection", value: command.collection });
            const inputs = [];
            inputs.push({ name: "name", value: name });
            await this.action.handle(inputs, options);
        });
    }
}
exports.NewCommand = NewCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbmV3LmNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEseURBQXFEO0FBRXJELE1BQWEsVUFBVyxTQUFRLGtDQUFlO0lBQ3RDLElBQUksQ0FBQyxPQUF3QjtRQUNsQyxPQUFPO2FBQ0osT0FBTyxDQUFDLFlBQVksQ0FBQzthQUNyQixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsV0FBVyxDQUFDLGlDQUFpQyxDQUFDO2FBQzlDLE1BQU0sQ0FDTCxxQkFBcUIsRUFDckIsNENBQTRDLENBQzdDO2FBQ0EsTUFBTSxDQUFDLGVBQWUsRUFBRSwrQ0FBK0MsQ0FBQzthQUN4RSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsOENBQThDLENBQUM7YUFDeEUsTUFBTSxDQUFDLG9CQUFvQixFQUFFLHFDQUFxQyxDQUFDO2FBQ25FLE1BQU0sQ0FDTCx3Q0FBd0MsRUFDeEMscUVBQXFFLEVBQ3JFLEtBQUssQ0FDTjthQUNBLE1BQU0sQ0FDTCwyQkFBMkIsRUFDM0Isa0NBQWtDLEVBQ2xDLElBQUksQ0FDTDthQUNBLE1BQU0sQ0FDTCx1Q0FBdUMsRUFDdkMsaURBQWlELEVBQ2pELE1BQU0sQ0FDUDthQUNBLE1BQU0sQ0FDTCx3Q0FBd0MsRUFDeEMsZ0NBQWdDLEVBQ2hDLE1BQU0sQ0FDUDthQUNBLE1BQU0sQ0FDTCxtQ0FBbUMsRUFDbkMsNENBQTRDLENBQzdDO2FBQ0EsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFZLEVBQUUsT0FBZ0IsRUFBRSxFQUFFO1lBQy9DLE1BQU0sT0FBTyxHQUFtQixFQUFFLENBQUM7WUFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUMzRCxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQzdELE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUNyRSxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNYLElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLEtBQUssRUFBRSxPQUFPLENBQUMsY0FBYzthQUM5QixDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDNUQsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1lBQ3hFLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUVoRSxNQUFNLE1BQU0sR0FBbUIsRUFBRSxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBRTNDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNGO0FBMURELGdDQTBEQyJ9