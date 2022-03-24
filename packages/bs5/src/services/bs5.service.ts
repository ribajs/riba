import { Breakpoint, Bs5ModuleOptions } from "../types/index.js";
import { DEFAULT_MODULE_OPTIONS } from "../constants/index.js";
import { debounce } from "@ribajs/utils/src/control";
import { getViewportDimensions } from "@ribajs/utils/src/dom.js";
import { EventDispatcher, EventCallback } from "@ribajs/events";

/**
 * Events:
 * * breakpoint:changed
 */
export class Bs5Service {
  protected _options: Bs5ModuleOptions = DEFAULT_MODULE_OPTIONS;
  protected _events = EventDispatcher.getInstance("bs5");
  protected _activeBreakpoint: Breakpoint | null = null;

  public static instance?: Bs5Service;

  protected constructor(options: Bs5ModuleOptions) {
    this._options = options;
    this.sortBreakpoints(this._options.breakpoints);
    this._onViewChanges();
    this.addEventListeners();
  }

  public static getSingleton() {
    if (Bs5Service.instance) {
      return Bs5Service.instance;
    }

    throw new Error(
      "Singleton of Bs5Service not defined, please call `Bs5Service.setSingleton` or `bs5Module.init` first!"
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

  protected onBreakpointChanges() {
    this._events.trigger("breakpoint:changed", this.activeBreakpoint);
  }

  protected setActiveBreakpoint(breakpoint: Breakpoint) {
    if (breakpoint && breakpoint.name !== this.activeBreakpoint?.name) {
      this._activeBreakpoint = breakpoint;
      this.onBreakpointChanges();
    }
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

  public sortBreakpoints(breakpoints: Breakpoint[]) {
    breakpoints.sort((a, b) => a.dimension - b.dimension);
  }

  public get options() {
    return this._options;
  }

  public get activeBreakpoint() {
    return this._activeBreakpoint;
  }

  public get breakpointNames() {
    return this.options.breakpoints.map((breakpoint) => breakpoint.name);
  }

  public get events() {
    return this._events;
  }

  public on(
    eventName: "breakpoint:changed",
    cb: (activeBreakpoint: Breakpoint) => void,
    thisContext?: any
  ): void;
  public on(eventName: string, cb: EventCallback, thisContext?: any) {
    return this.events.on(eventName, cb, thisContext);
  }

  public once(
    eventName: "breakpoint:changed",
    cb: (activeBreakpoint: Breakpoint) => void,
    thisContext?: any
  ): void;
  public once(eventName: string, cb: EventCallback, thisContext?: any) {
    return this.events.once(eventName, cb, thisContext);
  }

  public off(
    eventName: "breakpoint:changed",
    cb: (activeBreakpoint: Breakpoint) => void,
    thisContext?: any
  ): void;
  public off(eventName: string, cb: EventCallback, thisContext?: any) {
    return this.events.off(eventName, cb, thisContext);
  }

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

  public getNextBreakpointByName(name: string) {
    const breakpoints = this.breakpointNames;
    const index = breakpoints.indexOf(name);
    if (index < 0) {
      throw new Error(`the breakpoint "${name}" does not exist!`);
    }
    // There is no next breakpoint
    if (index === breakpoints.length - 1) {
      return null;
    }
    return breakpoints[index + 1];
  }

  public getPrevBreakpointByName(name: string) {
    const breakpoints = this.breakpointNames;
    const index = breakpoints.indexOf(name);
    if (index < 0) {
      throw new Error(`the breakpoint "${name}" does not exist!`);
    }
    // There is no previous breakpoint
    if (index === 0) {
      return null;
    }
    return breakpoints[index - 1];
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
