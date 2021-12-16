import { TemplateVars } from "../../deno-ssr/mod.ts";

export interface AlosaurThemeConfig {
  themeDir: string;
  active: string;
  templateVars?: TemplateVars;
}
