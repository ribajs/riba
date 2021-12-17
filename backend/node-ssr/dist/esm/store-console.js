export class StoreConsole {
    constructor() {
        this.type = "store";
        this._messages = [];
    }
    get debugs() {
        return this._messages.filter((message) => message.type === "debug");
    }
    get errors() {
        return this._messages.filter((message) => message.type === "error");
    }
    get infos() {
        return this._messages.filter((message) => message.type === "info");
    }
    get logs() {
        return this._messages.filter((message) => message.type === "log");
    }
    get warns() {
        return this._messages.filter((message) => message.type === "warn");
    }
    get messages() {
        return this._messages;
    }
    assert() {
    }
    clear() {
        console.debug("clear", this._messages);
        this._messages = [];
    }
    count() {
    }
    countReset() {
    }
    debug(message, ...optionalParams) {
        this._messages.push({ message, optionalParams, type: "debug" });
    }
    dir() {
    }
    dirxml() {
    }
    error(message, ...optionalParams) {
        this._messages.push({ message, optionalParams, type: "error" });
    }
    group() {
    }
    groupCollapsed() {
    }
    groupEnd() {
    }
    info(message, ...optionalParams) {
        this._messages.push({ message, optionalParams, type: "info" });
    }
    log(message, ...optionalParams) {
        this._messages.push({ message, optionalParams, type: "log" });
    }
    table() {
    }
    time() {
    }
    timeEnd() {
    }
    timeLog() {
    }
    trace() {
    }
    warn(message, ...optionalParams) {
        this._messages.push({ message, optionalParams, type: "warn" });
    }
    profile() {
    }
    profileEnd() {
    }
    timeStamp() {
    }
}
//# sourceMappingURL=store-console.js.map