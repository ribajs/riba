import { ICommandInput, IConfigurationLoader } from '../interfaces';
import { ConfigurationLoader } from '../lib/configuration';
import { FileSystemReader } from '../lib/readers';

export abstract class AbstractAction {
  public abstract async handle(
    inputs?: ICommandInput[],
    options?: ICommandInput[],
    extraFlags?: string[],
  ): Promise<void>;

  protected deepCopyInput(inputs: ICommandInput[]) {
    return inputs.map(input => ({...input}));
  }

  protected getInput(inputs: ICommandInput[], name: string) {
    const input = inputs.find(input => input.name === name);
    return input;
  }

  protected setInput(inputs: ICommandInput[], name: string, value: string | boolean) {
    const input = inputs.find(input => input.name === name);
    // Add new input if input not exists
    if (!input) {
      inputs.push({name, value});
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
  protected setDefaultInput(inputs: ICommandInput[], name: string, value: string | boolean) {
    const input = inputs.find(input => input.name === name);
    if (!input) {
      inputs.push({name, value});
      return this.getInput(inputs, name);
    }
    if (typeof(input.value) === 'undefined') {
      input.value = value;
    }
    return input;
  }


  protected concatOptions(inputsSources: ICommandInput[][]) {
    const result = new Array<ICommandInput>();

    for (const inputs of inputsSources) {
      const toConcat = this.deepCopyInput(inputs);
      for (const input of toConcat) {
        if (typeof(input.value) !== 'undefined') {
          this.setInput(result, input.name, input.value)
        }
      }
    }
    return result;
  }

  protected async loadConfiguration() {
    const loader: IConfigurationLoader = new ConfigurationLoader(
      new FileSystemReader(process.cwd()),
    );
    return loader.load();
  }

  protected async generateFiles(args: ICommandInput[], options: ICommandInput[]): Promise<void> {
    return Promise.resolve();
  }

}
