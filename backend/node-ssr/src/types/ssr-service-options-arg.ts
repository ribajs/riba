import type { SupportedTemplateEngines } from "./supported-template-engines";

export interface SsrServiceOptionsArg {
  timeout?: number;
  defaultRootTag?: string;
  defaultTemplateEngine?: SupportedTemplateEngines;
  defaultTemplateFile?: string;
  sourceFileDir: string;
  templateDir: string;
}
