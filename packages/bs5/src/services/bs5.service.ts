import { Breakpoint, Breakpoints, Bs5ModuleOptions } from "../types";
import { DEFAULT_MODULE_OPTIONS } from "../constants";

/**
 *
 */
export class Bs5Service {
  protected _options: Bs5ModuleOptions = DEFAULT_MODULE_OPTIONS;

  public get options() {
    return this._options;
  }

  public static instance?: Bs5Service;

  protected constructor(options: Bs5ModuleOptions) {
    this._options = options;
  }

  public static getSingleton() {
    if (Bs5Service.instance) {
      return Bs5Service.instance;
    }
    if (Bs5Service.instance) {
      throw new Error(
        `Singleton of ${this.constructor.name} not defined, please call setSingleton first!`
      );
    }
  }

  public static setSingleton(
    options: Bs5ModuleOptions = DEFAULT_MODULE_OPTIONS
  ) {
    if (Bs5Service.instance) {
      throw new Error(`Singleton of ${this.constructor.name} already defined!`);
    }
    Bs5Service.instance = new Bs5Service(options);
    return Bs5Service.instance;
  }

  get breakpointNames() {
    return Object.keys(this.options.breakpoints);
  }

  /**
   * Get breakpoint for width
   * @param dimension The dimension you are looking for, e.g. window.innerWidth
   * @param breakpoints Optional custom breakpoints, otherwise the default globally breakpoints are used
   */
  public getBreakpointByDimension(
    dimension: number,
    breakpoints?: Breakpoints
  ): Breakpoint {
    breakpoints = breakpoints || this.options.breakpoints;
    const breakpointNames = this.breakpointNames;

    for (let i = 0; i < breakpointNames.length; i++) {
      const curr: Breakpoint = {
        name: breakpointNames[i],
        dimension: breakpoints[breakpointNames[i]],
      };

      if (curr && dimension >= curr.dimension && dimension < curr.dimension) {
        return curr;
      }
    }

    const lastName = breakpointNames[breakpointNames.length - 1];
    const last: Breakpoint = {
      name: lastName,
      dimension: breakpoints[lastName],
    };

    if (dimension >= last.dimension) {
      return last;
    }

    const firstName = breakpointNames[0];
    const first: Breakpoint = {
      name: firstName,
      dimension: breakpoints[firstName],
    };

    return first;
  }

  /**
   * Get breakpoint by name
   * @param name The name you are looking for, e.g. xs
   * @param breakpoints Optional custom breakpoints, otherwise the default globally breakpoints are used
   */
  public getBreakpointByName(
    name: string,
    breakpoints?: Breakpoints
  ): Breakpoint {
    breakpoints = breakpoints || this.options.breakpoints;
    const breakpointNames = this.breakpointNames;
    const foundName = breakpointNames.find((bpName) => bpName === name);
    return {
      name: foundName,
      dimension: breakpoints[name],
    };
  }
}
