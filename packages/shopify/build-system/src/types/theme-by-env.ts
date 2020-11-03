import { ThemeData } from "./theme-data";

export interface ThemeByEnv {
  [env: string]: ThemeData;
}

export interface ThemesByEnv {
  [env: string]: ThemeData[];
}
