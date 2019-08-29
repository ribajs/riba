import { ICommandInput } from '../interfaces';
export declare abstract class AbstractAction {
    abstract handle(inputs?: ICommandInput[], options?: ICommandInput[], extraFlags?: string[]): Promise<void>;
    protected deepCopyInput(inputs: ICommandInput[]): {
        name: string;
        value: string | boolean;
    }[];
    protected getInput(inputs: ICommandInput[], name: string): ICommandInput | undefined;
    protected setInput(inputs: ICommandInput[], name: string, value: string | boolean): ICommandInput | undefined;
    /**
     * Sets input if value only if the value has not yet been set
     * @param inputs
     * @param name
     * @param value
     */
    protected setDefaultInput(inputs: ICommandInput[], name: string, value: string | boolean): ICommandInput | undefined;
    protected concatOptions(inputsSources: ICommandInput[][]): ICommandInput[];
    protected loadConfiguration(): Promise<import("../interfaces").IConfiguration>;
    protected generateFiles(args: ICommandInput[], options: ICommandInput[]): Promise<void>;
}
