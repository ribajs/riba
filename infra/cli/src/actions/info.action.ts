import chalk from "chalk";
import { readFile } from "fs";
import { platform, release } from "os";
import osName from "os-name";
import { join } from "path";
import {
  AbstractPackageManager,
  PackageManagerFactory,
} from "../lib/package-managers/index";
import { BANNER, messages } from "../lib/ui/index";
import { AbstractAction } from "./abstract.action";
import { PackageJsonDependencies, RibaDependency } from "../interfaces/index";

export class InfoAction extends AbstractAction {
  public async handle() {
    this.displayBanner();
    await this.displaySystemInformation();
    await this.displayRibaInformation();
  }

  private displayBanner() {
    console.info(BANNER);
  }

  private async displaySystemInformation() {
    console.info(chalk.green("[System Information]"));
    console.info(
      "OS Version      :",
      chalk.yellow(osName(platform(), release()))
    );
    console.info("NodeJS Version  :", chalk.yellow(process.version));
    await this.displayPackageManagerVersion();
  }

  private async displayPackageManagerVersion() {
    const manager: AbstractPackageManager = await PackageManagerFactory.find();
    try {
      const version: string = await manager.version();
      if (manager.name === "NPM") {
        console.info(`${manager.name} Version     :`, chalk.yellow(version));
      } else {
        console.info(`${manager.name} Version    :`, chalk.yellow(version));
      }
    } catch {
      console.error(`${manager.name} Version    :`, chalk.red("Unknown"));
    }
  }

  private displayRibaInformation = async () => {
    console.info(chalk.green("[Riba Information]"));
    try {
      const dependencies: PackageJsonDependencies = await this.readProjectPackageJsonDependencies();
      this.displayRibaVersions(dependencies);
    } catch {
      console.error(
        chalk.red(messages.RIBA_INFORMATION_PACKAGE_MANAGER_FAILED)
      );
    }
  };

  private async readProjectPackageJsonDependencies(): Promise<
    PackageJsonDependencies
  > {
    return new Promise<PackageJsonDependencies>((resolve, reject) => {
      readFile(
        join(process.cwd(), "package.json"),
        (error: NodeJS.ErrnoException | null, buffer: Buffer) => {
          if (error !== undefined && error !== null) {
            reject(error);
          } else {
            resolve(JSON.parse(buffer.toString()).dependencies);
          }
        }
      );
    });
  }

  private displayRibaVersions(dependencies: PackageJsonDependencies) {
    this.buildRibaVersionsMessage(dependencies).forEach((dependency) =>
      console.info(dependency.name, chalk.yellow(dependency.value))
    );
  }

  private buildRibaVersionsMessage(
    dependencies: PackageJsonDependencies
  ): RibaDependency[] {
    const nestDependencies = this.collectNestDependencies(dependencies);
    return this.format(nestDependencies);
  }

  private collectNestDependencies(
    dependencies: PackageJsonDependencies
  ): RibaDependency[] {
    const nestDependencies: RibaDependency[] = [];
    Object.keys(dependencies).forEach((key) => {
      if (key.indexOf("@ribajs") > -1) {
        let name = `${key.replace(/@ribajs\//, "")} Version`;
        name = name.charAt(0).toUpperCase() + name.slice(1);
        nestDependencies.push({
          name: name,
          value: dependencies[key],
        });
      }
    });
    return nestDependencies;
  }

  private format(dependencies: RibaDependency[]): RibaDependency[] {
    const sorted = dependencies.sort(
      (dependencyA, dependencyB) =>
        dependencyB.name.length - dependencyA.name.length
    );
    const length = sorted[0].name.length;
    sorted.forEach((dependency) => {
      if (dependency.name.length < length) {
        dependency.name = this.rightPad(dependency.name, length);
      }
      dependency.name = dependency.name.concat(" :");
      dependency.value = dependency.value.replace(/(\^|~)/, "");
    });
    return sorted;
  }

  private rightPad(name: string, length: number): string {
    while (name.length < length) {
      name = name.concat(" ");
    }
    return name;
  }
}
