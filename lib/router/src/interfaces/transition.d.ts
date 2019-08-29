/// <reference types="jquery" />
export interface ITransition {
    init($oldContainer: JQuery<Element>, newContainer: Promise<JQuery<Element>>): Promise<void>;
    done(): void;
    start(): any;
}
