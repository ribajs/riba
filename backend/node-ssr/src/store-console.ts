import type { ConsoleConstructor } from "console";
import type { ConsoleMessage, PipeConsole } from "./types";

export class StoreConsole implements PipeConsole {
  Console: ConsoleConstructor;

  readonly type = "store";

  private _messages: ConsoleMessage[] = [];

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

  constructor() {
    //
  }
  assert() {
    //
  }
  clear() {
    console.debug("clear", this._messages);
    this._messages = [];
  }
  count() {
    //
  }
  countReset() {
    //
  }
  debug(message?: any, ...optionalParams: any[]) {
    this._messages.push({ message, optionalParams, type: "debug" });
  }
  dir() {
    //
  }
  dirxml() {
    //
  }
  error(message?: any, ...optionalParams: any[]) {
    this._messages.push({ message, optionalParams, type: "error" });
  }
  group() {
    //
  }
  groupCollapsed() {
    //
  }
  groupEnd() {
    //
  }
  info(message?: any, ...optionalParams: any[]) {
    this._messages.push({ message, optionalParams, type: "info" });
  }
  log(message?: any, ...optionalParams: any[]) {
    this._messages.push({ message, optionalParams, type: "log" });
  }
  table() {
    //
  }
  time() {
    //
  }
  timeEnd() {
    //
  }
  timeLog() {
    //
  }
  trace() {
    //
  }
  warn(message?: any, ...optionalParams: any[]) {
    this._messages.push({ message, optionalParams, type: "warn" });
  }
  profile() {
    //
  }
  profileEnd() {
    //
  }
  timeStamp() {
    //
  }
}
