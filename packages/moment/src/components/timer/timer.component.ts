import { Component } from "@ribajs/core";

interface Scope {
  time: string;
  countdownRunning: boolean;
  remainingHours: number;
  remainingMinutes: number;
  remainingSeconds: number;
}

export class TimerComponent extends Component {
  public static tagName = "moment-timer";

  protected autobind = true;

  static get observedAttributes() {
    return ["time"];
  }

  protected requiredAttributes() {
    return ["time"];
  }

  protected scope: Scope = {
    countdownRunning: true,
    remainingHours: 0,
    remainingMinutes: 0,
    remainingSeconds: 0,
    time: "",
  };

  private timeObject?: Date;

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TimerComponent.observedAttributes);
    console.log("connected", this.scope);
    this.updateCountdown();
    setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  protected updateCountdown() {
    let remainingSeconds =
      (Date.parse(this.scope.time) - new Date().getTime()) / 1000;
    console.log(remainingSeconds);

    this.scope.remainingHours = Math.floor(remainingSeconds / (60 * 60));
    remainingSeconds -= this.scope.remainingHours * 60 * 60;

    this.scope.remainingMinutes = Math.floor(remainingSeconds / 60);
    remainingSeconds -= this.scope.remainingMinutes * 60;

    this.scope.remainingSeconds = Math.ceil(remainingSeconds);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes);
  }

  protected async beforeBind() {
    return await super.beforeBind();
  }

  protected async afterBind() {
    await super.afterBind();
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    return null;
  }
}
