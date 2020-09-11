import { Component } from "@ribajs/core";

interface Scope {
  time: string;

  countdownYears: boolean;
  countdownDays: boolean;
  countdownHours: boolean;
  countdownMinutes: boolean;
  countdownSeconds: boolean;

  countdownRunning: boolean;

  remainingYears: number;
  remainingDays: number;
  remainingHours: number;
  remainingMinutes: number;
  remainingSeconds: number;
}

///TODO: Add "timer" mode, which starts at a given point in time,
// and counts the time passed since than, and a mixed
// mode, which is basically a countdown and after the countdown reached 0,
// it continues as a "timer".
export class TimerComponent extends Component {
  public static tagName = "moment-timer";

  protected autobind = true;

  static get observedAttributes() {
    return [
      "time",
      "countdown-years",
      "countdown-days",
      "countdown-hours",
      "countdown-minutes",
      "countdown-seconds",
    ];
  }

  protected requiredAttributes() {
    return ["time"];
  }

  protected scope: Scope = {
    countdownYears: false,
    countdownDays: true,
    countdownHours: true,
    countdownMinutes: true,
    countdownSeconds: true,

    countdownRunning: true,

    remainingYears: 0,
    remainingDays: 0,
    remainingHours: 0,
    remainingMinutes: 0,
    remainingSeconds: 0,
    time: "",
  };

  private updateIntervalId?: number;

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TimerComponent.observedAttributes);
    this.startCountdownInterval();
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

  protected updateCountdown() {
    //calculate seconds until countdown is over
    let remainingSeconds = this.getRemainingSeconds();
    if (!remainingSeconds || remainingSeconds < 1) {
      this.cancelCountdownInterval();
      this.resetCountdown();
      return;
    }

    const secsOfMinute = 60;
    const secsOfHour = 60 * secsOfMinute;
    const secsOfDay = 24 * secsOfHour;
    const secsOfYear = 365 * secsOfDay;

    // TODO leap year (Schaltjahr)
    if (this.scope.countdownYears) {
      if (this.isYearsLastUnit()) {
        this.scope.remainingYears = Math.ceil(remainingSeconds / secsOfYear);
        return;
      } else {
        this.scope.remainingYears = Math.floor(remainingSeconds / secsOfYear);
        remainingSeconds -= this.scope.remainingYears * secsOfYear;
      }
    }

    if (this.scope.countdownDays) {
      if (this.isDaysLastUnit()) {
        this.scope.remainingDays = Math.ceil(remainingSeconds / secsOfDay);
        return;
      } else {
        this.scope.remainingDays = Math.floor(remainingSeconds / secsOfDay);
        remainingSeconds -= this.scope.remainingDays * secsOfDay;
      }
    }

    if (this.scope.countdownHours) {
      if (this.isHoursLastUnit()) {
        this.scope.remainingHours = Math.ceil(remainingSeconds / secsOfHour);
        return;
      } else {
        this.scope.remainingHours = Math.floor(remainingSeconds / secsOfHour);
        remainingSeconds -= this.scope.remainingHours * secsOfHour;
      }
    }

    if (this.scope.countdownMinutes) {
      if (this.isMinutesLastUnit()) {
        this.scope.remainingMinutes = Math.ceil(
          remainingSeconds / secsOfMinute
        );
        return;
      } else {
        this.scope.remainingMinutes = Math.floor(
          remainingSeconds / secsOfMinute
        );
        remainingSeconds -= this.scope.remainingMinutes * secsOfMinute;
      }
    }

    this.scope.remainingSeconds = Math.ceil(remainingSeconds);
  }

  protected resetCountdown() {
    this.scope.remainingDays = 0;
    this.scope.remainingHours = 0;
    this.scope.remainingMinutes = 0;
    this.scope.remainingSeconds = 0;
  }

  //returns remaining seconds until this.scope.time is reached.
  protected getRemainingSeconds(): number {
    return Math.ceil(
      (Date.parse(this.scope.time) - new Date().getTime()) / 1000
    );
  }

  protected isYearsLastUnit(): boolean {
    return (
      this.scope.countdownYears == false &&
      this.scope.countdownHours == false &&
      this.scope.countdownMinutes == false &&
      this.scope.countdownSeconds == false
    );
  }

  protected isDaysLastUnit(): boolean {
    return (
      this.scope.countdownHours == false &&
      this.scope.countdownMinutes == false &&
      this.scope.countdownSeconds == false
    );
  }

  protected isHoursLastUnit(): boolean {
    return (
      this.scope.countdownMinutes == false &&
      this.scope.countdownSeconds == false
    );
  }
  protected isMinutesLastUnit(): boolean {
    return this.scope.countdownSeconds == false;
  }

  protected startCountdownInterval() {
    //call function immediatly to
    this.updateCountdown();
    //create interval and save id to clear later to prevent resource leaking
    this.updateIntervalId = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  protected cancelCountdownInterval() {
    if (this.updateIntervalId) clearInterval(this.updateIntervalId);
    this.updateIntervalId = undefined;
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.cancelCountdownInterval();
  }

  protected template() {
    return null;
  }
}
