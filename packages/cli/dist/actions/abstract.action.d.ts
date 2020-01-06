import { CommandInput } from '../interfaces';
export declare abstract class AbstractAction {
    abstract handle(inputs?: CommandInput[], options?: CommandInput[], extraFlags?: string[]): Promise<void>;
    protected deepCopyInput(inputs: CommandInput[]): {
        name: string;
        value: string | boolean;
    }[];
    protected getInput(inputs: CommandInput[], name: string): CommandInput | undefined;
    protected setInput(inputs: CommandInput[], name: string, value: string | boolean): CommandInput | undefined;
    /**
     * Sets input if value only if the value has not yet been set
     * @param inputs
     * @param name
     * @param value
     */
    protected setDefaultInput(inputs: CommandInput[], name: string, value: string | boolean): CommandInput | undefined;
    protected concatOptions(inputsSources: CommandInput[][]): CommandInput[];
    protected loadConfiguration(): Promise<import("../interfaces").Configuration>;
    protected generateFiles(args: CommandInput[], options: CommandInput[]): Promise<void>;
}
