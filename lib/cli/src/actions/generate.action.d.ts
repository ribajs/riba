import { ICommandInput, IConfiguration } from '../interfaces';
import { AbstractAction } from './abstract.action';
import { SchematicOption } from '../lib/schematics';
export declare class GenerateAction extends AbstractAction {
    debug: import("debug").Debugger;
    schematicOptions: SchematicOption[];
    constructor();
    handle(inputs: ICommandInput[], options: ICommandInput[]): Promise<void>;
    protected setDefaults(inputs: ICommandInput[], options: ICommandInput[]): Promise<ICommandInput[]>;
    protected generateFiles(inputs: ICommandInput[]): Promise<void>;
    private mapSchematicOptions;
    /**
     * If no path is set and the current directory has not the name of the default directory name, only then set the default path
     * @param inputs
     * @param configuration
     * @param schematicInput
     */
    setPathInput(inputs: ICommandInput[], options: ICommandInput[], configuration: IConfiguration, schematicInput: ICommandInput): Promise<ICommandInput | undefined>;
}
