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
