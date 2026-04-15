import { Breakpoint, TwModuleOptions } from "../types/index.js";
import { DEFAULT_MODULE_OPTIONS } from "../constants/index.js";
import { debounce } from "@ribajs/utils/src/control.js";
import { getViewportDimensions } from "@ribajs/utils/src/dom.js";
import { EventDispatcher, EventCallback } from "@ribajs/events";

/**
 * Tailwind Service — breakpoint management singleton.
 *
 * Events:
 * - `breakpoint:changed` — fired when the active breakpoint changes
 */
export class TwService {
  protected _options: TwModuleOptions = DEFAULT_MODULE_OPTIONS;
  protected _events = EventDispatcher.getInstance("tw");
  protected _activeBreakpoint: Breakpoint | null = null;

  public static instance?: TwService;

  protected constructor(options: TwModuleOptions) {
    this._options = options;
    this.sortBreakpoints(this._options.breakpoints);
    this._onViewChanges();
    this.addEventListeners();
  }

  public static getSingleton() {
    if (TwService.instance) {
      return TwService.instance;
    }

    throw new Error(
      "Singleton of TwService not defined, please call `TwService.setSingleton` or `twModule.init` first!",
    );
  }

  public static setSingleton(
    options: TwModuleOptions = DEFAULT_MODULE_OPTIONS,
  ) {
    if (TwService.instance) {
      throw new Error(`Singleton of TwService already defined!`);
    }
    TwService.instance = new TwService(options);
    return TwService.instance;
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
    const vp = getViewportDimensions();
    const newBreakpoint = this.getBreakpointByDimension(vp.w);
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
    return this.options.breakpoints.map((bp) => bp.name);
  }

  public get events() {
    return this._events;
  }

  public on(
    eventName: "breakpoint:changed",
    cb: (activeBreakpoint: Breakpoint) => void,
    thisContext?: any,
  ): void;
  public on(eventName: string, cb: EventCallback, thisContext?: any) {
    return this.events.on(eventName, cb, thisContext);
  }

  public once(
    eventName: "breakpoint:changed",
    cb: (activeBreakpoint: Breakpoint) => void,
    thisContext?: any,
  ): void;
  public once(eventName: string, cb: EventCallback, thisContext?: any) {
    return this.events.once(eventName, cb, thisContext);
  }

  public off(
    eventName: "breakpoint:changed",
    cb: (activeBreakpoint: Breakpoint) => void,
    thisContext?: any,
  ): void;
  public off(eventName: string, cb: EventCallback, thisContext?: any) {
    return this.events.off(eventName, cb, thisContext);
  }

  /**
   * Get breakpoint for width.
   * Uses mobile-first logic: returns the largest breakpoint whose dimension <= the given width.
   */
  public getBreakpointByDimension(
    dimension: number,
    breakpoints?: Breakpoint[],
  ): Breakpoint | null {
    breakpoints = breakpoints || this.options.breakpoints;

    let matched: Breakpoint | null = null;
    for (const bp of breakpoints) {
      if (dimension >= bp.dimension) {
        matched = bp;
      } else {
        break;
      }
    }
    return matched;
  }

  /**
   * Get breakpoint by name.
   */
  public getBreakpointByName(
    name: string,
    breakpoints?: Breakpoint[],
  ): Breakpoint | null {
    breakpoints = breakpoints || this.options.breakpoints;
    return breakpoints.find((bp) => bp.name === name) || null;
  }

  public getNextBreakpointByName(name: string): string | null {
    const names = this.breakpointNames;
    const index = names.indexOf(name);
    if (index < 0) {
      throw new Error(`The breakpoint "${name}" does not exist!`);
    }
    if (index === names.length - 1) {
      return null;
    }
    return names[index + 1];
  }

  public getPrevBreakpointByName(name: string): string | null {
    const names = this.breakpointNames;
    const index = names.indexOf(name);
    if (index < 0) {
      throw new Error(`The breakpoint "${name}" does not exist!`);
    }
    if (index === 0) {
      return null;
    }
    return names[index - 1];
  }

  public isBreakpointGreaterThan(
    isName: string,
    compareName: string,
  ): boolean | null {
    const a = this.getBreakpointByName(isName);
    const b = this.getBreakpointByName(compareName);
    if (a && b) {
      return a.dimension > b.dimension;
    }
    return null;
  }

  public isBreakpointSmallerThan(
    isName: string,
    compareName: string,
  ): boolean | null {
    const a = this.getBreakpointByName(isName);
    const b = this.getBreakpointByName(compareName);
    if (a && b) {
      return a.dimension < b.dimension;
    }
    return null;
  }

  public isActiveBreakpointGreaterThan(compareName: string): boolean | null {
    if (!this.activeBreakpoint) {
      return null;
    }
    return this.isBreakpointGreaterThan(
      this.activeBreakpoint.name,
      compareName,
    );
  }

  public isActiveBreakpointSmallerThan(compareName: string): boolean | null {
    if (!this.activeBreakpoint) {
      return null;
    }
    return this.isBreakpointSmallerThan(
      this.activeBreakpoint.name,
      compareName,
    );
  }
}
