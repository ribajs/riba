import { TemplateVars } from "../../deno-node-ssr/mod.ts";

export interface AlosaurThemeConfig {
  themeDir: string;
  active: string;
  templateVars?: TemplateVars;
}
