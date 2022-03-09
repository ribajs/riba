import {
  CommandInput,
  ConfigurationLoader as IConfigurationLoader,
} from "../interfaces/index";
import { ConfigurationLoader } from "../lib/configuration/index";
import { FileSystemReader } from "../lib/readers/index";
import { join } from "path";

export abstract class AbstractAction {
  public abstract async handle(
    inputs?: CommandInput[],
    options?: CommandInput[],
    extraFlags?: string[]
  ): Promise<void>;

  protected deepCopyInput(inputs: CommandInput[]) {
    return inputs.map((input) => ({ ...input }));
  }

  protected getInput(inputs: CommandInput[], name: string) {
    const input = inputs.find((input) => input.name === name);
    return input;
  }

  protected setInput(
    inputs: CommandInput[],
    name: string,
    value: string | boolean
  ) {
    const input = inputs.find((input) => input.name === name);
    // Add new input if input not exists
    if (!input) {
      inputs.push({ name, value });
      return this.getInput(inputs, name);
    }
    input.value = value;
    return input;
  }

  /**
   * Sets input if value only if the value has not yet been set
   * @param inputs
   * @param name
   * @param value
   */
  protected setDefaultInput(
    inputs: CommandInput[],
    name: string,
    value: string | boolean
  ) {
    const input = inputs.find((input) => input.name === name);
    if (!input) {
      inputs.push({ name, value });
      return this.getInput(inputs, name);
    }
    if (typeof input.value === "undefined") {
      input.value = value;
    }
    return input;
  }

  protected concatOptions(inputsSources: CommandInput[][]) {
    const result = new Array<CommandInput>();

    for (const inputs of inputsSources) {
      const toConcat = this.deepCopyInput(inputs);
      for (const input of toConcat) {
        if (typeof input.value !== "undefined") {
          this.setInput(result, input.name, input.value);
        }
      }
    }
    return result;
  }

  protected async loadConfiguration(projectDirectory?: string) {
    let path = process.cwd();
    if (projectDirectory) {
      path = join(path, projectDirectory);
    }
    const loader: IConfigurationLoader = new ConfigurationLoader(
      new FileSystemReader(path)
    );
    return loader.load();
  }

  protected async generateFiles(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    args: CommandInput[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options: CommandInput[]
  ): Promise<void> {
    return Promise.resolve();
  }
}
