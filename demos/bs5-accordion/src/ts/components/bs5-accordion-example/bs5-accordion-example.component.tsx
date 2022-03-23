import { Component, TemplateFunction } from "@ribajs/core";
import { AccordionItem } from "@ribajs/bs5";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

interface Scope {
  items2: AccordionItem[]
}

export class As5accordionExampleComponent extends Component {
  public static tagName = "bs5-accordion-example";

  protected autobind = true;
  static get observedAttributes(): string[] {
    return [];
  }

  public scope: Scope = {
    items2: [
      {
        title: "Title 1",
        content: "Hello world!"
      },
      {
        title: "Title 2",
        content: "Hello underground!"
      }
    ]
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(As5accordionExampleComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return <div class="row my-5">
      <section class="col-12 my-5">
        <h2>bs5-accordion component with template items</h2>
        <p>Set items using templates:</p>
        <bs5-accordion collapse-icon-src="/iconset/svg/arrow_carrot_thin.svg">
          <template title="Collapsible Group Item #1">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
          </template>
          <template title="Collapsible Group Item #2">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
          </template>
          <template title="Collapsible Group Item #3">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
          </template>
        </bs5-accordion>
      </section>
      <section class="col-12 my-5">
        <h2>bs5-accordion component using items attribute</h2>
        <p>Set items using the items attribute:</p>
        <bs5-accordion collapse-icon-src="/iconset/svg/arrow_carrot.svg" collapse-icon-size={32} rv-co-items="items2"></bs5-accordion>
      </section>
      <section class="col-12 my-5">
        <h2>bs5-collapse</h2>
        <bs5-collapse title="Collapse example" collapsed={true}>

        </bs5-collapse>
      </section>
    </div>;
    }
  }
}
