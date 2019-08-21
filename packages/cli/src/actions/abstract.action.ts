import { ICommandInput } from '../interfaces/command.input';

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

}
