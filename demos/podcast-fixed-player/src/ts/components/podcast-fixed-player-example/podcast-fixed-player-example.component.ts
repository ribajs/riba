import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./podcast-fixed-player-example.component.pug";

import { episode03 } from "../../data/episode-03/episode";
import { episode01 } from "../../data/episode-01/episode";
import { config } from "../../data/config";

export class PodcastFixedPlayerExampleComponent extends Component {
  public static tagName = "podcast-fixed-player-example";

  protected autobind = true;
  static get observedAttributes(): string[] {
    return [];
  }

  public scope = {
    episode03,
    episode01,
    config,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(PodcastFixedPlayerExampleComponent.observedAttributes);
  }

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template(this.scope);
    }
  }
}
