import { AbstractAction } from './abstract.action';
export declare class InfoAction extends AbstractAction {
    handle(): Promise<void>;
    private displayBanner;
    private displaySystemInformation;
    private displayPackageManagerVersion;
    private displayRibaInformation;
    private readProjectPackageJsonDependencies;
    private displayRibaVersions;
    private buildRibaVersionsMessage;
    private collectNestDependencies;
    private format;
    private rightPad;
}
