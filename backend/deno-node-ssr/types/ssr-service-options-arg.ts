// See https://github.com/ribajs/riba/blob/master/backend/node-ssr/src/types/ssr-service-options-arg.ts

import type { SupportedTemplateEngines } from "./supported-template-engines.ts";

export interface SsrServiceOptionsArg {
  timeout?: number;
  defaultRootTag?: string;
  defaultTemplateEngine?: SupportedTemplateEngines;
  defaultTemplateFile?: string;
  sourceFileDir: string;
  templateDir: string;
}
