import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

import { episode03 } from "../../data/episode-03/episode.js";
import { episode01 } from "../../data/episode-01/episode.js";
import { config } from "../../data/config.js";

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

  protected async template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      const { default: template } = await import(
        "./podcast-fixed-player-example.component.pug"
      );
      return template(this.scope);
    }
  }
}
