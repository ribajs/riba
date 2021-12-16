// See https://github.com/ribajs/riba/blob/master/backend/node-ssr/src/types/ssr-service-options.ts

import type { SupportedTemplateEngines } from "./template-engines.ts";

export interface SsrServiceOptions {
  timeout: number;
  defaultRootTag: string;
  defaultTemplateEngine: SupportedTemplateEngines;
  defaultTemplateFile: string;
  sourceFileDir: string;
  templateDir: string;
}
