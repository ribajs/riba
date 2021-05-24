import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils";
import template from "./video-example.component.pug";

export interface Scope {
  videos: string[];
  selectedVideo: string;
  selectVideo: VideoExampleComponent["selectVideo"];
}

export class VideoExampleComponent extends Component {
  public static tagName = "video-example";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return [];
  }

  public scope: Scope = {
    videos: ["/videos/desktop.mp4", "/videos/mobile.mp4"],
    selectedVideo: "",
    selectVideo: this.selectVideo,
  };

  constructor() {
    super();
  }

  public selectVideo(video: string) {
    this.scope.selectedVideo = video;
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(VideoExampleComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  // deconstruction
  protected disconnectedCallback() {
    super.disconnectedCallback();
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
