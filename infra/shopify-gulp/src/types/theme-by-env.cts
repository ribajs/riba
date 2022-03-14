import { ThemeData } from "./theme-data.cjs";

export interface ThemeByEnv {
  [env: string]: ThemeData;
}

export interface ThemesByEnv {
  [env: string]: ThemeData[];
}
