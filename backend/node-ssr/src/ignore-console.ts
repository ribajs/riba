import type { ConsoleConstructor } from "console";
import type { PipeConsole } from "./types";

export class IgnoreConsole implements PipeConsole {
  Console: ConsoleConstructor;

  public readonly type = "ignore";

  constructor() {
    //
  }
  assert() {
    //
  }
  clear() {
    //
  }
  count() {
    //
  }
  countReset() {
    //
  }
  debug() {
    //
  }
  dir() {
    //
  }
  dirxml() {
    //
  }
  error() {
    //
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
  info() {
    //
  }
  log() {
    //
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
  warn() {
    //
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
