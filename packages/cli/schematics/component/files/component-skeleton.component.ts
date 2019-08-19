import {
  RibaComponent,
  Debug,
} from '@ribajs/core';

{/* <$if test={$.templateEngine === 'pug'}>
  import pugTemplate from './component-skeleton.component.pug';
</$if>

<$if test={$.templateEngine === 'html'}>
  import template from './component-skeleton.component.html';
</$if> */}

interface IScope {
  hello?: string;
}

export class <$string value={$.objectPrefix} />Component extends RibaComponent {

  public static tagName: string = 'rv-component-skeleton';

  protected autobind = true;

  static get observedAttributes() {
    return ['hello'];
  }

  protected debug = Debug('component:' + <$string value={$.objectPrefix} />Component.tagName);

  protected scope: IScope = {
    hello: undefined,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.debug('constructor', this);
    this.init(<$string value={$.objectPrefix} />Component.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes)
    .then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    this.debug('beforeBind');
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
  }

  protected requiredAttributes() {
    return [];
  }

  protected attributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    super.attributeChangedCallback(attributeName, oldValue, newValue, namespace);
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    let template: string | null = null;
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      this.debug('Do not template, because element has child nodes');
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug('Use template', template);
      return template;
    }
  }
}
