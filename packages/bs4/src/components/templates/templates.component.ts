import {
  Component,
  Utils,
} from '@ribajs/core';

export type AttributeType = string; // 'string' | 'number' | 'boolean';

export interface TemplateAttribute {
  name: string;
  type?: AttributeType;
  required?: boolean;
}

export type TemplateAttributes = Array<TemplateAttribute>;

export interface Scope {
  items: Array<any>;
}

export abstract class TemplatesComponent extends Component {

  protected templateAttributes: TemplateAttributes = [];

  protected templateReady = false;

  protected abstract scope: Scope;

  protected connectedCallback() {
    this.addItemsByTemplate();
    super.connectedCallback();
    this.removeTemplates();
    this.bindIfReady();
  }

  protected ready() {
    return super.ready() && this.templateReady;
  }

  /**
   * Called before getting attribute value, use this method to tramsform the attribute value if you wish
   * @param name Attribute name
   * @param value Attribute value
   */
  protected transformTemplateAttribute(name: string, value: any, type?: AttributeType) {
    switch (type) {
      case 'number':
        value = Number(value);
        break;
      case 'boolean':
        value = value === 'true';
        break;
      case 'string':
      default:
        break;
    }
    return value;
  }

  /**
   * Called before getting all attribute values, use this method to tramsform the attribute values if you wish
   * @param attributes
   */
  protected transformTemplateAttributes(attributes: any, index: number) {
    return attributes;
  }

  protected getTemplateAttributes(tpl: HTMLTemplateElement, index: number) {
    const attributes: any = {};
    for (const attribute of this.templateAttributes) {
      const attrValue = this.transformTemplateAttribute(attribute.name, tpl.getAttribute(attribute.name));
      if (attribute.required && !attrValue) {
        console.error(new Error(`template "${attribute.name}" attribute is required!`));
        return;
      }
      attributes[Utils.camelCase(attribute.name)] = attrValue;
    }
    return this.transformTemplateAttributes(attributes, index);
  }

  protected addItemByTemplate(tpl: HTMLTemplateElement, index: number) {
    const attributes = this.getTemplateAttributes(tpl, index);
    const content = tpl.innerHTML;
    this.scope.items.push({...attributes, content});
  }

  protected addItemsByTemplate() {
    const templates = this.el.querySelectorAll<HTMLTemplateElement>('template');
    for (let index = 0; index < templates.length; index++) {
      const tpl = templates[index];
      this.addItemByTemplate(tpl, index);
    }
    this.templateReady = true;
  }

  protected removeTemplates() {
    const templates = this.el.querySelectorAll<HTMLTemplateElement>('template');
    for (let index = 0; index < templates.length; index++) {
      const tpl = templates[index];
      this.el.removeChild(tpl);
    }
  }

  protected hasOnlyTemplateChilds() {
    let allAreTemplates: boolean = true;
    for (let index = 0; index < this.el.childNodes.length; index++) {
      const child = this.el.childNodes[index];
      allAreTemplates = allAreTemplates && (child.nodeName === 'TEMPLATE' || child.nodeName === '#text');
    }
    return allAreTemplates;
  }

  // protected template() {
  //   // Only set the component template if there no childs or the childs are templates
  //   if (!this.el.hasChildNodes() || this.hasOnlyTemplateChilds()) {
  //     return template;
  //   } else {
  //     return null;
  //   }
  // }
}
