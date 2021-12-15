import type { SupportedTemplateEngines } from "@ribajs/ssr";

export interface SsrServiceOptions {
  timeout: number;
  defaultRootTag: string;
  defaultTemplateEngine: SupportedTemplateEngines;
  defaultTemplateFile: string;
  sourceFileDir: string;
  templateDir: string;
}
