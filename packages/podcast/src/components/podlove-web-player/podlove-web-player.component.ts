import { Component, TemplateFunction } from "@ribajs/core";
import { PodloveWebPlayerComponentScope } from "../../types";
import { hasChildNodesTrim, loadScript } from "@ribajs/utils";
import template from "./podlove-web-player.component.pug";

export class PodloveWebPlayerComponent extends Component {
  public static tagName = "podlove-web-player";

  static get observedAttributes() {
    return ["selector", "episode", "config"];
  }

  protected requiredAttributes(): string[] {
    return ["selector", "episode", "config"];
  }

  public scope: PodloveWebPlayerComponentScope = {
    selector: "#podlove-web-layer",
    episode: "",
    config: "",
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(PodloveWebPlayerComponent.observedAttributes);
  }

  protected async loadPlayer() {
    await loadScript(
      "//cdn.podlove.org/web-player/5.x/embed.js",
      "podlove-web-placer-5-x",
      true,
      true
    );

    if (!window.podlovePlayer) {
      throw new Error("Can't load Podlove Web Player");
    }

    window.podlovePlayer(
      this.scope.selector,
      this.scope.episode,
      this.scope.config
    );
  }

  protected async beforeBind() {
    await super.beforeBind();
    await this.loadPlayer();
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return template(this.scope);
    } else {
      return null;
    }
  }
}
