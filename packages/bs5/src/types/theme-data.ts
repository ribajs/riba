import type { ThemeChoice } from "./theme-choice";

export interface ThemeData {
  /** true if the system / OS and browser supports color scheme (if this is not the case the color scheme can still be changed via css) */
  supported: boolean;
  /** Color scheme is the color scheme from the os / system */
  bySystem: boolean;
  /** Color scheme is set by the user and the system default is overwritten */
  byUser: boolean;
  /** Color scheme is light (from system or overwritten by the user) */
  isLight: boolean;
  /** Color scheme is dark (from system or overwritten by the user) */
  isDark: boolean;
  /** System / OS color scheme is light (User selection is ignored here) */
  systemIsLight: boolean;
  /** System / OS color scheme is dark (User selection is ignored here) */
  systemIsDark: boolean;
  /** The user selection (theme-os, theme-dark or theme-light) */
  choice: ThemeChoice;
}
