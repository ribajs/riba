import { ICommandInput, IConfigurationLoader } from '../interfaces';
import { ConfigurationLoader } from '../lib/configuration';
import { FileSystemReader } from '../lib/readers';

export abstract class AbstractAction {
  public abstract async handle(
    inputs?: ICommandInput[],
    options?: ICommandInput[],
    extraFlags?: string[],
  ): Promise<void>;

  protected getInput(inputs: ICommandInput[], name: string) {
    const input = inputs.find(input => input.name === name);
    return input;
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
