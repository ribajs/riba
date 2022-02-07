import type { Bs5ThemeButtonComponent } from "../components/bs5-theme-button/bs5-theme-button.component";
import type { ThemeChoice } from "./theme-choice";

export interface Bs5ThemeButtonComponentScope {
  // Options // Attributes
  mode: "dropdown" | "icon";
  labels: {
    [key in ThemeChoice]: string;
  };
  lightIconSrc?: string;
  darkIconSrc?: string;
  iconSize?: number;
  // Methods / Properties
  setTheme: Bs5ThemeButtonComponent["setTheme"];
  selectTheme: Bs5ThemeButtonComponent["selectTheme"];
  toggleTheme: Bs5ThemeButtonComponent["toggleTheme"];
  selected?: ThemeChoice;
  choices: ThemeChoice[];
}
