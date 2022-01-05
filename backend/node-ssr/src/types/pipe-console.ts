// import type { Console } from "console";

export interface PipeConsole extends Console {
  readonly type?: "store" | "ignore";
}
