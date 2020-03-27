import { RunnerFactory } from "../runners";
import { YarnRunner } from "../runners/yarn.runner";
import { AbstractPackageManager } from "./abstract.package-manager";
import {
  PackageManager,
  Runner,
  PackageManagerCommands,
} from "../../interfaces";

export class YarnPackageManager extends AbstractPackageManager {
  constructor() {
    super(RunnerFactory.create(Runner.YARN) as YarnRunner);
  }

  public get name() {
    return PackageManager.YARN.toUpperCase();
  }

  get cli(): PackageManagerCommands {
    return {
      install: "install",
      add: "add",
      update: "upgrade",
      remove: "remove",
      saveFlag: "",
      saveDevFlag: "-D",
    };
  }
}
