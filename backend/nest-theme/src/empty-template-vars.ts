import { TemplateVars } from '@ribajs/node-ssr';

export class EmptyTemplateVars implements TemplateVars {
  public get() {
    return {};
  }
}
