import { RunnerFactory } from '../runners';
import { NpmRunner } from '../runners/npm.runner';
import { AbstractPackageManager } from './abstract.package-manager';
import { IPackageManagerCommands, Runner, PackageManager } from '../../interfaces';

export class NpmPackageManager extends AbstractPackageManager {
  constructor() {
    super(RunnerFactory.create(Runner.NPM) as NpmRunner);
  }

  public get name() {
    return PackageManager.NPM.toUpperCase();
  }

  get cli(): IPackageManagerCommands {
    return {
      install: 'install',
      add: 'install',
      update: 'update',
      remove: 'uninstall',
      saveFlag: '--save',
      saveDevFlag: '--save-dev',
    };
  }
}
