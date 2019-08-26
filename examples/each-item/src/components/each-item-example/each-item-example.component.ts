import {
  Component,
  Debug,
  IDebugger,
} from '@ribajs/core';

import template from './each-item-example.component.html';

interface IItem {
  name: string;
  value?: number;
}

interface IScope {
  items: Array<IItem>,
  push: EachItemExampleComponent['push'],
  pop: EachItemExampleComponent['pop'],
  shift: EachItemExampleComponent['shift'],
  unshift: EachItemExampleComponent['unshift'],
  splice: EachItemExampleComponent['splice'],
  reset: EachItemExampleComponent['reset'],
  sort: EachItemExampleComponent['sort'],
}

export class EachItemExampleComponent extends Component {

  public static tagName: string = 'rv-each-item-example';

  protected autobind = true;

  protected debug: IDebugger = Debug('component:' +EachItemExampleComponent.tagName);

  protected scope: IScope = {
    items: this.getItems(),
    push: this.push,
    pop: this.pop,
    shift: this.shift,
    unshift: this.unshift,
    splice: this.splice,
    reset: this.reset,
    sort: this.sort,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.debug('constructor', this);
    this.init(EachItemExampleComponent.observedAttributes);
  }

  static get observedAttributes() {
    return [];
  }

  public push() {
    this.scope.items.push({name: 'pushed'})
  }

  public pop() {
    this.scope.items.pop()
  }

  public shift() {
    this.scope.items.shift()
  }

  public unshift() {
    this.scope.items.unshift({name: 'shifted'})
  }

  public splice() {
    this.scope.items.splice(1, 1, {name: 'spliced1'}, {name: 'spliced2'})
  }

  public reset() {
    this.scope.items = this.getItems()
  }

  public sort() {
    this.scope.items.sort((a, b) => {
      return (a.value || 0) - (b.value || 0)
    })
  }

  private getItems(): IItem[] {
    return [{name: 'x', value: 2} ,{name: 'y', value: 1} , {name: 'z', value: 3}]
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes)
    .then((view) => {
      return view;
    });
  }

  protected requiredAttributes() {
    return [];
  }

  protected attributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    super.attributeChangedCallback(attributeName, oldValue, newValue, namespace);
  }

  protected template() {
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      this.debug('Do not use template, because element has child nodes');
      return null;
    } else {
      
      this.debug('Use template', template);
      return template;
    }
  }
}
