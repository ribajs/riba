import type { SupportedTemplateEngines } from "@ribajs/ssr";

export interface SsrServiceOptionsArg {
  timeout?: number;
  defaultRootTag?: string;
  defaultTemplateEngine?: SupportedTemplateEngines;
  defaultTemplateFile?: string;
  sourceFileDir: string;
  templateDir: string;
}
