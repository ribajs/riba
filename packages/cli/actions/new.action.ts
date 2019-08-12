import chalk from 'chalk';
import * as dashify from 'dashify';
import * as pascalcase from 'pascalcase';
import { ICommandInput } from '../interfaces/command.input';
import { AbstractAction } from './abstract.action';

export class NewAction extends AbstractAction {

  public async handle(inputs: ICommandInput[], options: ICommandInput[]) {
    const projectName = this.getProjectName(inputs);
    const objectPrefix = pascalcase(projectName);
    const filePrefix = dashify(objectPrefix);

    const shouldSkipInstall = this.getBooleanOption(options, 'skip-install');
    const shouldSkipGit = this.getBooleanOption(options, 'skip-git');

    console.log(`Generate a new Riba project with the name "${objectPrefix}" and file prefix: "${filePrefix}"`);
  }

  private getProjectName(inputs: ICommandInput[]) {
    const input = inputs.find(input => input.name === 'name');
    if (!input) {
      throw new Error(chalk.red('A project name is required!'));
    }
    return input.value.toString();
  }

  private getBooleanOption(options: ICommandInput[], name: string) {
    return options.some(
      option => option.name === 'skip-install' && option.value === true,
    );
  }
}
