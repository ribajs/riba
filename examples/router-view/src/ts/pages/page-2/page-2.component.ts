import { Component } from "@ribajs/core";

export class Page2PageComponent extends Component {
  public static tagName = "page-2-page";

  static get observedAttributes() {
    return [];
  }

  protected scope = {
    content:
      "Cheesecake candy lollipop cake sugar plum sesame snaps. Chocolate cake topping croissant gummies marshmallow chocolate cake. Candy canes topping pie jelly-o oat cake cheesecake soufflé marshmallow. Topping lollipop biscuit donut. Jujubes danish marshmallow candy canes jelly muffin cake jelly beans. Muffin candy brownie carrot cake donut wafer tart gummies. Croissant topping lollipop brownie muffin halvah tart wafer. Sugar plum ice cream bonbon cookie dragée topping oat cake marzipan. Carrot cake jelly beans cookie chupa chups chocolate bar marzipan tiramisu. Croissant jujubes cookie. Ice cream topping sugar plum jelly beans. Cake dessert candy canes.",
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Page2PageComponent.observedAttributes);
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    return null;
  }
}
