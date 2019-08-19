import chalk from 'chalk';
import { ICommandInput } from '../interfaces';
import { AbstractAction } from './abstract.action';
import { SkeletonGenerator } from '../lib/skeleton-generator/skeleton.generator';

export class NewAction extends AbstractAction {

  skeletonGenerator = new SkeletonGenerator();

  public async handle(inputs: ICommandInput[], options: ICommandInput[]) {
    const projectName = this.getProjectName(inputs);


    const shouldSkipInstall = this.getBooleanOption(options, 'skip-install');
    const shouldSkipGit = this.getBooleanOption(options, 'skip-git');

    // this.skeletonGenerator.new(projectName);
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
