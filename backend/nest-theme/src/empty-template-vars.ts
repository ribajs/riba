import { TemplateVars } from './types/template-vars';

export class EmptyTemplateVars implements TemplateVars {
  public get() {
    return {};
  }
}
