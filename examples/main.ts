import {
  Riba,
  View,
  Debug,
  JQuery,

  coreModule,

} from '@ribajs/core';

export interface IItem {
  name: string;
  value?: number;
}

export class Main {

  protected view?: View;
  protected debug = Debug('app:main');
  protected riba = new Riba();
  protected model = {
    items: this.getItems(),
    push: this.push,
    pop: this.pop,
    shift: this.shift,
    unshift: this.unshift,
    splice: this.splice,
    reset: this.reset.bind(this),
    sort: this.sort,
  };

  constructor() {
    this.debug('init the main application');

    // Regist modules
    this.riba.module.regist(coreModule);

    JQuery(() => {
      const bindToElement = JQuery('#test')[0];
      this.debug('bind to', bindToElement);
      this.view = this.riba.bind(bindToElement, this.model);
    });
  }

  private getItems(): IItem[] {
    return [{name: 'x', value: 2} ,{name: 'y', value: 1} , {name: 'z', value: 3}]
  }

  public push() {
    this.model.items.push({name: 'pushed'})
  }

  public pop() {
    this.model.items.pop()
  }

  public shift() {
    this.model.items.shift()
  }

  public unshift() {
    this.model.items.unshift({name: 'shifted'})
  }

  public splice() {
    this.model.items.splice(1, 1, {name: 'spliced1'}, {name: 'spliced2'})
  }

  public reset() {
    this.model.items = this.getItems()
  }

  public sort() {
    this.model.items.sort((a, b) => {
      return (a.value || 0) - (b.value || 0)
    })
  }
}

const app = new Main();