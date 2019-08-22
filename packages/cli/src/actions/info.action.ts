import chalk from 'chalk';
import { readFile } from 'fs';
import { platform, release } from 'os';
import osName = require('os-name');
import { join } from 'path';
import {
  AbstractPackageManager,
  PackageManagerFactory,
} from '../lib/package-managers';
import { BANNER, messages } from '../lib/ui';
import { AbstractAction } from './abstract.action';
import { IPackageJsonDependencies, IRibaDependency } from '../interfaces';

export class InfoAction extends AbstractAction {
  public async handle() {
    this.displayBanner();
    await this.displaySystemInformation();
    await this.displayNestInformation();
  }

  private displayBanner() {
    console.info(BANNER);
  };


  private async displaySystemInformation() {
    console.info(chalk.green('[System Information]'));
    console.info('OS Version      :', chalk.yellow(osName(platform(), release())));
    console.info('NodeJS Version  :', chalk.yellow(process.version));
    await this.displayPackageManagerVersion();
  };
  
  private async displayPackageManagerVersion() {
    const manager: AbstractPackageManager = await PackageManagerFactory.find();
    try {
      const version: string = await manager.version();
      console.info(`${manager.name} Version    :`, chalk.yellow(version));
    } catch {
      console.error(`${manager.name} Version    :`, chalk.red('Unknown'));
    }
  };
  
  private displayNestInformation = async () => {
    console.info(chalk.green('[Nest Information]'));
    try {
      const dependencies: IPackageJsonDependencies = await this.readProjectIPackageJsonDependencies();
      this.displayNestVersions(dependencies);
    } catch {
      console.error(chalk.red(messages.RIBA_INFORMATION_PACKAGE_MANAGER_FAILED));
    }
  };
  
  private async readProjectIPackageJsonDependencies(): Promise<IPackageJsonDependencies> {
    return new Promise<IPackageJsonDependencies>((resolve, reject) => {
      readFile(
        join(process.cwd(), 'package.json'),
        (error: NodeJS.ErrnoException | null, buffer: Buffer) => {
          if (error !== undefined && error !== null) {
            reject(error);
          } else {
            resolve(JSON.parse(buffer.toString()).dependencies);
          }
        },
      );
    });
  };
  
  private displayNestVersions(dependencies: IPackageJsonDependencies) {
    this.buildNestVersionsMessage(dependencies).forEach(dependency =>
      console.info(dependency.name, chalk.yellow(dependency.value)),
    );
  }
  
  private buildNestVersionsMessage(dependencies: IPackageJsonDependencies): IRibaDependency[] {
    const nestDependencies = this.collectNestDependencies(dependencies);
    return this.format(nestDependencies);
  };
  
  private collectNestDependencies(dependencies: IPackageJsonDependencies): IRibaDependency[] {
    const nestDependencies: IRibaDependency[] = [];
    Object.keys(dependencies).forEach(key => {
      if (key.indexOf('@nestjs') > -1) {
        nestDependencies.push({
          name: `${key.replace(/@nestjs\//, '')} version`,
          value: dependencies[key],
        });
      }
    });
    return nestDependencies;
  };
  
  private format(dependencies: IRibaDependency[]): IRibaDependency[] {
    const sorted = dependencies.sort(
      (dependencyA, dependencyB) =>
        dependencyB.name.length - dependencyA.name.length,
    );
    const length = sorted[0].name.length;
    sorted.forEach(dependency => {
      if (dependency.name.length < length) {
        dependency.name = this.rightPad(dependency.name, length);
      }
      dependency.name = dependency.name.concat(' :');
      dependency.value = dependency.value.replace(/(\^|\~)/, '');
    });
    return sorted;
  };
  
  private rightPad(name: string, length: number): string {
    while (name.length < length) {
      name = name.concat(' ');
    }
    return name;
  };

}
