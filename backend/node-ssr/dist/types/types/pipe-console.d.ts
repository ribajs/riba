export interface PipeConsole extends Console {
    readonly type?: "store" | "ignore";
}
