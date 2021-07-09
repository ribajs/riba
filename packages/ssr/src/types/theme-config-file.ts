import type { ThemeConfig } from "./theme-config";

export type ThemeConfigFile = (env?: string) => ThemeConfig;
