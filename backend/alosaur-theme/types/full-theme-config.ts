import type { ThemeConfig } from "./theme-config.ts";
import type { AlosaurThemeConfig } from "./alosaur-theme-config.ts";
import { TemplateVars } from "../../deno-ssr/mod.ts";

export interface FullThemeConfig extends ThemeConfig, AlosaurThemeConfig {
  basePath: string;
  templateVars: TemplateVars;
}
