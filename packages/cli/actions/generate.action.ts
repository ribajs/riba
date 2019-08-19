import chalk from 'chalk';
import { ICommandInput } from '../interfaces';
import { AbstractAction } from './abstract.action';
import { SkeletonGenerator } from '../lib/skeleton-generator/skeleton.generator';

export class GenerateAction extends AbstractAction {

  skeletonGenerator = new SkeletonGenerator();

  public async handle(inputs: ICommandInput[], options: ICommandInput[]) {
    await this.generateFiles(inputs.concat(options));
  }

  private async generateFiles(inputs: ICommandInput[]) {
    // console.log('Generate files: ', inputs);
    const skeleton = this.getSkeleton(inputs);
    const name = this.getName(inputs);
    const path = this.getPath(inputs) || process.cwd();
    this.skeletonGenerator.generate(skeleton, name, path);
  }

  private getName(inputs: ICommandInput[]) {
    const input = inputs.find(input => input.name === 'name');
    if (!input || !input.value) {
      throw new Error(chalk.red('A name is required!'));
    }
    return input.value.toString();
  }

  private getSkeleton(inputs: ICommandInput[]) {
    const input = inputs.find(input => input.name === 'skeleton');
    if (!input || !input.value) {
      throw new Error(chalk.red('A skeleton name is required!'));
    }
    return input.value.toString();
  }

  private getPath(inputs: ICommandInput[]) {
    const input = inputs.find(input => input.name === 'path');
    if (!input || !input.value) {
      return null;
    }
    return input.value.toString();
  }

}
