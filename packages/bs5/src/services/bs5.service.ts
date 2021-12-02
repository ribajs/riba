import { Breakpoint, Bs5ModuleOptions } from "../types";
import { DEFAULT_MODULE_OPTIONS } from "../constants";
import { debounce } from "@ribajs/utils/src/control";
import { getViewportDimensions } from "@ribajs/utils/src/dom";
import { EventDispatcher } from "@ribajs/events";

/**
 * Events:
 * * breakpoint:changed
 */
export class Bs5Service {
  protected _options: Bs5ModuleOptions = DEFAULT_MODULE_OPTIONS;
  protected _events = EventDispatcher.getInstance("bs5");
  protected _activeBreakpoint: Breakpoint | null = null;

  public get options() {
    return this._options;
  }

  public get activeBreakpoint() {
    return this._activeBreakpoint;
  }

  get breakpointNames() {
    return this.options.breakpoints.map((breakpoint) => breakpoint.name);
  }

  public get events() {
    return this._events;
  }

  public static instance?: Bs5Service;

  protected constructor(options: Bs5ModuleOptions) {
    this._options = options;
    this._options.breakpoints.sort((a, b) => a.dimension - b.dimension);
    this._onViewChanges();
    this.addEventListeners();
  }

  protected onBreakpointChanges() {
    this._events.trigger("breakpoint:changed", this.activeBreakpoint);
    // console.debug("breakpoint: " + this.activeBreakpoint?.name);
  }

  protected setActiveBreakpoint(breakpoint: Breakpoint) {
    if (breakpoint && breakpoint.name !== this.activeBreakpoint?.name) {
      this._activeBreakpoint = breakpoint;
      this.onBreakpointChanges();
    }
  }

  public static getSingleton() {
    if (Bs5Service.instance) {
      return Bs5Service.instance;
    }

    throw new Error(
      `Singleton of Bs5Service not defined, please call setSingleton first!`
    );
  }

  public static setSingleton(
    options: Bs5ModuleOptions = DEFAULT_MODULE_OPTIONS
  ) {
    if (Bs5Service.instance) {
      throw new Error(`Singleton of Bs5Service already defined!`);
    }
    Bs5Service.instance = new Bs5Service(options);
    return Bs5Service.instance;
  }

  protected addEventListeners() {
    window.addEventListener("resize", this.onViewChanges, { passive: true });
  }

  protected removeEventListeners() {
    window.removeEventListener("resize", this.onViewChanges);
  }

  protected _onViewChanges() {
    const newBreakpoint =
      this.getBreakpointByDimension(getViewportDimensions().w) ||
      this.getBreakpointByName("xs");
    if (newBreakpoint) {
      this.setActiveBreakpoint(newBreakpoint);
    }
  }

  protected onViewChanges = debounce(this._onViewChanges.bind(this));

  /**
   * Get breakpoint for width
   * @param dimension The dimension you are looking for, e.g. window.innerWidth
   * @param breakpoints Optional custom breakpoints, otherwise the default globally breakpoints are used
   */
  public getBreakpointByDimension(
    dimension: number,
    breakpoints?: Breakpoint[]
  ): Breakpoint | null {
    breakpoints = breakpoints || this.options.breakpoints;

    for (let i = 0; i < breakpoints.length - 1; i++) {
      const curr = breakpoints[i];
      const next = breakpoints[i + 1];
      if (
        next &&
        curr &&
        dimension > curr.dimension &&
        dimension < next.dimension
      ) {
        return curr;
      }
    }

    const last = breakpoints[breakpoints.length - 1];
    if (dimension >= last.dimension) {
      return last;
    }

    return null;
  }

  /**
   * Get breakpoint by name
   * @param name The name you are looking for, e.g. xs
   * @param breakpoints Optional custom breakpoints, otherwise the default globally breakpoints are used
   */
  public getBreakpointByName(
    name: string,
    breakpoints?: Breakpoint[]
  ): Breakpoint | null {
    breakpoints = breakpoints || this.options.breakpoints;
    const found = breakpoints.find((breakpoint) => breakpoint.name === name);
    if (!found) {
      return null;
    }
    return found;
  }

  public isBreakpointGreaterThan(
    isBreakpointName: string,
    compareBreakpointName: string
  ): boolean | null {
    const isBreakpoint = this.getBreakpointByName(isBreakpointName);
    const compareBreakpoint = this.getBreakpointByName(compareBreakpointName);
    if (isBreakpoint && compareBreakpoint) {
      return isBreakpoint.dimension > compareBreakpoint.dimension;
    }
    return null;
  }

  public isBreakpointSmallerThan(
    isBreakpointName: string,
    compareBreakpointName: string
  ): boolean | null {
    const isBreakpoint = this.getBreakpointByName(isBreakpointName);
    const compareBreakpoint = this.getBreakpointByName(compareBreakpointName);
    if (isBreakpoint && compareBreakpoint) {
      return isBreakpoint.dimension < compareBreakpoint.dimension;
    }
    return null;
  }

  public isActiveBreakpointGreaterThan(
    compareBreakpoint: string
  ): boolean | null {
    if (!this.activeBreakpoint) {
      return null;
    }
    return this.isBreakpointGreaterThan(
      this.activeBreakpoint.name,
      compareBreakpoint
    );
  }

  public isActiveBreakpointSmallerThan(
    compareBreakpoint: string
  ): boolean | null {
    if (!this.activeBreakpoint) {
      return null;
    }
    return this.isBreakpointSmallerThan(
      this.activeBreakpoint.name,
      compareBreakpoint
    );
  }
}
