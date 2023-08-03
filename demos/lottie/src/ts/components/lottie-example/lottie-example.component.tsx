import { Component, TemplateFunction, HttpService } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils";
import { PlayMode } from "@ribajs/lottie";

export class LottieExampleComponent extends Component {
  public static tagName = "lottie-example";

  protected autobind = true;
  static get observedAttributes(): string[] {
    return [];
  }

  public scope = {
    animationData1: {} as any,
  };

  constructor() {
    super();
  }

  protected async connectedCallback() {
    super.connectedCallback();
    super.init(LottieExampleComponent.observedAttributes);
  }

  protected async beforeBind() {
    super.beforeBind();
    this.scope.animationData1 = await this.loadAnimationData();
  }

  protected async loadAnimationData() {
    // https://lottiefiles.com/120771-infinite-thing?lang=de
    const res = await HttpService.getJSON(
      "https://assets9.lottiefiles.com/packages/lf20_kAsZEvAyfc.json",
    );
    return res.body;
  }

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return (
        <div class="lottie-web-player-example-wrapper">
          <p>
            Example is based on the{" "}
            <a href="https://codesandbox.io/s/y2nxyvomyj?file=/index.html:389-3336">
              original Example
            </a>
            .
          </p>
          <h3>Play from remote URL with controls displayed</h3>
          <lottie-player
            src="https://assets4.lottiefiles.com/datafiles/zc3XRzudyWE36ZBJr7PIkkqq0PFIrIBgp4ojqShI/newAnimation.json"
            style="width: 400px;"
            autoplay={true}
            loop={true}
            controls={true}
          ></lottie-player>

          <hr style="border: 3px #999 solid; margin: 20px 0;" />

          <h3>Use light version of the lottie web player</h3>
          <lottie-player
            src="https://assets4.lottiefiles.com/datafiles/zc3XRzudyWE36ZBJr7PIkkqq0PFIrIBgp4ojqShI/newAnimation.json"
            light={true}
            style="width: 400px;"
            autoplay={true}
            loop={true}
            controls={true}
          ></lottie-player>

          <hr style="border: 3px #999 solid; margin: 20px 0;" />

          <h3>Play from JSON Object</h3>
          <lottie-player
            rv-co-src="animationData1"
            style="width: 400px;"
            autoplay={true}
            loop={true}
            controls={true}
          ></lottie-player>

          <hr style="border: 3px #999 solid; margin: 20px 0;" />

          <h3>Autoplay without controls</h3>
          <lottie-player
            src="https://assets4.lottiefiles.com/datafiles/zc3XRzudyWE36ZBJr7PIkkqq0PFIrIBgp4ojqShI/newAnimation.json"
            style="width: 400px;"
            autoplay={true}
            loop={true}
            controls={false}
          ></lottie-player>

          <hr style="border: 3px #999 solid; margin: 20px 0;" />

          <h3>Play animation on hover with loop intermission</h3>
          <lottie-player
            src="https://assets4.lottiefiles.com/datafiles/zc3XRzudyWE36ZBJr7PIkkqq0PFIrIBgp4ojqShI/newAnimation.json"
            style="width: 400px;"
            loop={true}
            hover={true}
            intermission={1000}
          ></lottie-player>

          <hr style="border: 3px #999 solid; margin: 20px 0;" />

          <h3>"Bounce" play mode</h3>
          <lottie-player
            mode={PlayMode.Bounce}
            src="https://assets4.lottiefiles.com/datafiles/zc3XRzudyWE36ZBJr7PIkkqq0PFIrIBgp4ojqShI/newAnimation.json"
            style="width: 400px;"
            loop={true}
            autoplay={true}
          ></lottie-player>

          <hr style="border: 3px #999 solid; margin: 20px 0;" />

          <h3>With background color</h3>
          <lottie-player
            src="https://assets4.lottiefiles.com/datafiles/zc3XRzudyWE36ZBJr7PIkkqq0PFIrIBgp4ojqShI/newAnimation.json"
            style="width: 400px;"
            loop={true}
            autoplay={true}
            background="#ffcc00"
          ></lottie-player>

          <hr style="border: 3px #999 solid; margin: 20px 0;" />

          <h3>With custom styling</h3>
          <lottie-player
            src="https://assets4.lottiefiles.com/datafiles/zc3XRzudyWE36ZBJr7PIkkqq0PFIrIBgp4ojqShI/newAnimation.json"
            style="
          width: 400px;
          --lottie-player-seeker-track-color: #ff3300;
          --lottie-player-seeker-thumb-color: #ffcc00;
        "
            loop={true}
            autoplay={true}
            controls={true}
          ></lottie-player>

          <hr style="border: 3px #999 solid; margin: 20px 0;" />

          <h3>With event handlers</h3>
          <lottie-player
            id="playerHandler"
            src="https://assets4.lottiefiles.com/datafiles/zc3XRzudyWE36ZBJr7PIkkqq0PFIrIBgp4ojqShI/newAnimation.json"
            style="
          width: 400px;
          --lottie-player-seeker-track-color: #ff3300;
          --lottie-player-seeker-thumb-color: #ffcc00;
        "
            loop={true}
            autoplay={true}
            controls={true}
          ></lottie-player>
        </div>
      );
    }
  }
}
