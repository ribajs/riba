import {
  Component,
  Utils,
} from '@ribajs/core';

export type AttributeType = 'string' | 'number' | 'boolean';

export interface TemplateAttribute {
  name: string;
  type?: AttributeType;
  required?: boolean;
}

export type TemplateAttributes = Array<TemplateAttribute>;

export interface Scope {
  items: Array<any>;
}

// TODO move to riba core?
// TODO use this for Bs4TabsComponent
export abstract class TemplatesComponent extends Component {

  protected templateAttributes: TemplateAttributes = [];

  protected abstract scope: Scope;

  protected connectedCallback() {
    super.connectedCallback();
    this.addItemsByTemplate();
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
  protected transformTemplateAttributes(attributes: any) {
    return attributes;
  }

  protected getTemplateAttributes(tpl: HTMLTemplateElement) {
    const attributes: any = {};
    for (const attribute of this.templateAttributes) {
      const attrValue = this.transformTemplateAttribute(attribute.name, tpl.getAttribute(attribute.name));
      if (attribute.required && !attrValue) {
        console.error(new Error(`template "${attribute.name}" attribute is required!`));
        return;
      }
      attributes[Utils.camelCase(attribute.name)] = attrValue;
    }
    return this.transformTemplateAttributes(attributes);
  }

  protected addItemByTemplate(tpl: HTMLTemplateElement) {
    const attributes = this.getTemplateAttributes(tpl);
    const content = tpl.innerHTML;
    this.scope.items.push({...attributes, content});
  }

  protected addItemsByTemplate() {
    const templates = this.el.querySelectorAll<HTMLTemplateElement>('template');
    templates.forEach((tpl) => {
      this.addItemByTemplate(tpl);
    });
  }

  protected hasOnlyTemplateChilds() {
    let allAreTemplates: boolean = true;
    this.el.childNodes.forEach((child) => {
      allAreTemplates = allAreTemplates && (child.nodeName === 'TEMPLATE' || child.nodeName === '#text');
    });
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
