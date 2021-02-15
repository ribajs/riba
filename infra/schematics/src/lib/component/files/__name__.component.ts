import {
  Component,
} from '@ribajs/core';
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";

<% if (templateEngine === 'pug') { %>import pugTemplate from './<%= name %>.component.pug';<% } %><% if (templateEngine === 'html') { %>import template from './<%= name %>.component.html';<% } %>

interface Scope {
  hello: string;
}

export class <%= classify(name) %>Component extends Component {

  public static tagName: string = 'rv-<%= name %>';

  public _debug = true;

  protected autobind = true;

  static get observedAttributes() {
    return ['hello'];
  }

  protected scope: Scope = {
    hello: '',
  };

  constructor() {
    super();
    this.debug('constructor', this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    return this.init(<%= classify(name) %>Component.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes)
    .then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.debug('beforeBind', this.scope);
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
    await super.afterBind();
  }

  protected requiredAttributes() {
    return [];
  }

  protected attributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    return super.attributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );
  }

  protected parsedAttributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    return super.parsedAttributeChangedCallback(attributeName, oldValue, newValue, namespace);
  }

  // deconstruction
  protected disconnectedCallback() {
    return super.disconnectedCallback();
  }

  protected template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      this.debug('Do not use template, because element has child nodes');
      return null;
    } else {
      <% if (templateEngine === 'pug') { %>const template = pugTemplate(this.scope);<% } %>this.debug('Use template', template);
      return template;
    }
  }
}
