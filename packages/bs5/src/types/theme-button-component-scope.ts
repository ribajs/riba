import type { Bs5ThemeButtonComponent } from "../components/bs5-theme-button/bs5-theme-button.component";
import type { ThemeChoice } from "./theme-choice";

export interface Bs5ThemeButtonComponentScope {
  setTheme: Bs5ThemeButtonComponent["setTheme"];
  selectTheme: Bs5ThemeButtonComponent["selectTheme"];
  selected?: ThemeChoice;
  choices: ThemeChoice[];
  labels: {
    [key in ThemeChoice]: string;
  };
}
