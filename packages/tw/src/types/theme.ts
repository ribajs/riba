export type ThemeChoice = "os" | "light" | "dark";

export interface ThemeData {
  choice: ThemeChoice;
  resolved: "light" | "dark";
}

export interface ThemeChangedData {
  previous: ThemeData;
  current: ThemeData;
}
