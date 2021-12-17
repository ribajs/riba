export interface ConsoleMessage {
    message?: any;
    optionalParams?: any[];
    type: "error" | "debug" | "warn" | "log" | "info";
}
