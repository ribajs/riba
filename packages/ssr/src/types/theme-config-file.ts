import type { ThemeConfig } from "./theme-config";

/**
 * Function type for your theme config file
 * @param env Passes the current environment, e.g. production or development
 * @returns The theme config object
 */
export type ThemeConfigFile = (env?: string) => ThemeConfig;
