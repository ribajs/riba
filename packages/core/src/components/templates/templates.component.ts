import { Component, parseType } from "@ribajs/core";
import { camelCase, parseJsonString } from "@ribajs/utils/src/index.js";

export type AttributeType = string;

export interface TemplateAttribute {
  name: string;
  type?: AttributeType;
  required?: boolean;
}

export type TemplateAttributes = Array<TemplateAttribute>;

export interface Scope {
  items?: Array<any>;
}

export abstract class TemplatesComponent extends Component {
  protected templateAttributes: TemplateAttributes = [];

  protected templateReady = false;

  public abstract scope: Scope;

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
   * Called before getting attribute value, use this method to transform the attribute value if you wish
   * @param name Attribute name
   * @param value Attribute value
   */
  protected transformTemplateAttribute(
    name: string,
    value: any,
    type?: AttributeType
  ) {
    switch (type) {
      case "number":
        return Number(value);
      case "boolean":
        return value === "true";
      case "string":
        if (typeof value === "string") {
          return value;
        }
        if (typeof value?.toString === "function") {
          return value.toString();
        }
      case "object":
        return parseJsonString(value);
    }
    return parseType(value).value;
  }

  /**
   * Called before getting all attribute values, use this method to transform the attribute values if you wish
   * @param attributes
   */
  protected transformTemplateAttributes(attributes: any, index: number) {
    attributes.index = attributes.index || index;
    return attributes;
  }

  protected getTemplateAttributes(
    tpl: HTMLTemplateElement | HTMLElement,
    index: number
  ) {
    const attributes: any = {};
    for (const attribute of this.templateAttributes) {
      const attrValue = tpl.getAttribute(attribute.name);
      if (typeof attrValue !== "string" && attribute.required) {
        console.error(
          new Error(`template "${attribute.name}" attribute is required!`)
        );
      } else {
        attributes[camelCase(attribute.name)] = this.transformTemplateAttribute(
          attribute.name,
          tpl.getAttribute(attribute.name)
        );
      }
    }
    return this.transformTemplateAttributes(attributes, index);
  }

  protected addItemByTemplate(
    tpl: HTMLTemplateElement | HTMLElement,
    index: number
  ) {
    const attributes = this.getTemplateAttributes(tpl, index);
    const content = tpl.innerHTML;
    if (!this.scope.items) {
      this.scope.items = [];
    }
    this.scope.items.push({ ...attributes, content });
  }

  protected addItemsByTemplate() {
    const templates = this.querySelectorAll<HTMLTemplateElement | HTMLElement>(
      "template, .template"
    );
    for (let index = 0; index < templates.length; index++) {
      const tpl = templates[index];

      this.addItemByTemplate(tpl, index);
    }
    this.templateReady = true;
  }

  protected removeTemplates() {
    const templates = this.querySelectorAll<HTMLTemplateElement | HTMLElement>(
      "template, .template"
    );
    for (let index = 0; index < templates.length; index++) {
      const tpl = templates[index];
      this.removeChild(tpl);
    }
  }

  protected hasOnlyTemplateChilds() {
    return !Array.from(this.children).some(
      (child) =>
        child.nodeName !== "TEMPLATE" &&
        !child.classList?.contains("template") &&
        child.nodeName !== "#text"
    );
  }
}
