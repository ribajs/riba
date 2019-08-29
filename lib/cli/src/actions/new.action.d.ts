import { ICommandInput } from '../interfaces';
import { AbstractAction } from './abstract.action';
export declare class NewAction extends AbstractAction {
    private debug;
    handle(inputs: ICommandInput[], options: ICommandInput[]): Promise<void>;
    private askForMissingInformation;
    private replaceICommandInputMissingInformation;
    protected setDefaults(inputs: ICommandInput[], options: ICommandInput[]): Promise<void>;
    protected generateFiles(inputs: ICommandInput[]): Promise<void>;
    /**
     * Calls some generation actions to generate example files
     * @param inputs
     * @param options
     */
    protected generateExampleFiles(inputs: ICommandInput[], options: ICommandInput[]): Promise<void>;
    /**
     * Set inputs and options to generate example files
     * @param inputs
     * @param options
     * @param generateAction
     * @param schematic
     */
    private getInputsForGenerateExamples;
    private mapSchematicOptions;
    private installPackages;
    private selectPackageManager;
    private askForPackageManager;
    private initializeGitRepository;
    /**
     * Write a file `.gitignore` in the root of the newly created project.
     * `.gitignore` available in `@nestjs/schematics` cannot be published to
     * NPM (needs to be investigated).
     *
     * @param dir Relative path to the project.
     * @param content (optional) Content written in the `.gitignore`.
     *
     * @return Resolves when succeeds, or rejects with any error from `fn.writeFile`.
     */
    private createGitIgnoreFile;
    private printCollective;
    private print;
}
export declare const retrieveCols: () => number;
export declare const exit: () => never;
