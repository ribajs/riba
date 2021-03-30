import { Component, TemplateFunction } from "@ribajs/core";
import template from "./each-item-example.component.html";

export class EachItemExampleComponent extends Component {
  public static tagName = "rv-each-item-example";

  protected scope: Scope = {
    items: this.getItems(),
    pop: this.pop,
    push: this.push,
    reset: this.reset,
    shift: this.shift,
    sort: this.sort,
    splice: this.splice,
    unshift: this.unshift,
  };

  constructor() {
    super();
  }

  public push() {
    this.scope.items.push({ name: "pushed" });
  }

  public pop() {
    this.scope.items.pop();
  }

  public shift() {
    this.scope.items.shift();
  }

  public unshift() {
    this.scope.items.unshift({ name: "shifted" });
  }

  public splice() {
    this.scope.items.splice(1, 1, { name: "spliced1" }, { name: "spliced2" });
  }

  public reset() {
    this.scope.items = this.getItems();
  }

  public sort() {
    this.scope.items.sort((a, b) => {
      return (a.value || 0) - (b.value || 0);
    });
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init([]);
  }

  protected getItems(): Item[] {
    return [
      { name: "x", value: 2 },
      { name: "y", value: 1 },
      { name: "z", value: 3 },
    ];
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}

interface Item {
  name: string;
  value?: number;
}

interface Scope {
  items: Item[];
  push: EachItemExampleComponent["push"];
  pop: EachItemExampleComponent["pop"];
  shift: EachItemExampleComponent["shift"];
  unshift: EachItemExampleComponent["unshift"];
  splice: EachItemExampleComponent["splice"];
  reset: EachItemExampleComponent["reset"];
  sort: EachItemExampleComponent["sort"];
}
