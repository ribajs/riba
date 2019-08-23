import { Riba, Debug, coreModule } from '@ribajs/core';
import { EachItemExampleComponent } from './components/each-item-example/each-item-example.component';

export interface IItem {
  name: string;
  value?: number;
}

export class MainModule {

  protected debug = Debug('app:MainModule');
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
    this.debug('init the main application test');

    // Register modules
    this.riba.module.regist(coreModule);

    // Wait until dom is ready
    document.addEventListener("DOMContentLoaded", () => {
      const bindToElement = document.getElementById("rv-app");
      this.debug('bind to', bindToElement);
      this.riba.bind(bindToElement, this.model);
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

new MainModule();