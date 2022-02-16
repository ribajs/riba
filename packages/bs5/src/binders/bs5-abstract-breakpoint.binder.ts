import { BasicComponent, Binder, View } from "@ribajs/core";
import { Bs5Service } from "../services/bs5.service";
import { parseJsonString, jsonStringify, camelCase } from "@ribajs/utils";

export abstract class Bs5AbstractBreakpointBinder<
  E extends HTMLElement = HTMLElement
> extends Binder<string, E> {
  protected abstract defaultAttributeBinder: Binder<
    any,
    HTMLElement | BasicComponent
  >;
  protected bs5: Bs5Service;
  protected breakpoint: string;
  protected attributeName: string;
  protected val?: any;

  constructor(
    view: View,
    el: E,
    type: string | null,
    name: string,
    keypath: string | undefined,
    formatters: string[] | null,
    identifier: string | null
  ) {
    super(view, el, type, name, keypath, formatters, identifier);
    this.bs5 = Bs5Service.getSingleton();
    if (this.args.length !== 2) {
      throw new Error(
        "The Bs5AttributeBreakpointBinder was not initialized correctly!"
      );
    }
    const breakpoint = this.args[0].toString();
    const attributeName = this.args[1].toString();
    if (!this.bs5.breakpointNames.includes(breakpoint)) {
      throw new Error(
        `Unknown breakpoint "${breakpoint}"! You can define breakpoints at the initialization of the Bs5Module.`
      );
    }
    this.breakpoint = breakpoint;
    this.attributeName = attributeName;
  }

  protected onBreakpointChanges(/* activeBreakpoint: Breakpoint */) {
    this.setAttributeOnMatch();
  }

  /**
   * Sets the attribute if the current breakpoint matches
   * @returns
   */
  protected setAttributeOnMatch() {
    if (!this.bs5.activeBreakpoint) return;
    if (this.isBreakpointMatch(this.breakpoint)) {
      return this.defaultAttributeBinder.routine(this.el, this.val);
    }
    if (this.breakpointUnhandled(this.bs5.activeBreakpoint.name)) {
      // Remove attribute
      this.defaultAttributeBinder.routine(this.el, undefined);
    }
  }

  /**
   * Returns `true` if the current active breakpoint matches the breakpoints handled by this binder
   * @param breakpoint
   * @returns
   */
  protected isBreakpointMatch(breakpoint = this.breakpoint) {
    if (!this.bs5.activeBreakpoint) {
      return false;
    }

    if (this.bs5.activeBreakpoint.name === breakpoint) {
      return true;
    }

    const myBreakpoints = this.myBreakpoints(breakpoint);
    if (myBreakpoints.includes(this.bs5.activeBreakpoint.name)) {
      return true;
    }
    return false;
  }

  /**
   * Returns all breakpoints handled by this binder.
   * This binder handles multiple breakpoints if other larger breakpoints exists but are not handled by another binder.
   * @returns
   */
  protected myBreakpoints(breakpoint = this.breakpoint) {
    const myBreakpoints: string[] = [breakpoint];
    let nextBreakpoint: string | null = breakpoint;
    while (nextBreakpoint) {
      nextBreakpoint = this.bs5.getNextBreakpointByName(nextBreakpoint);

      if (!nextBreakpoint || this.breakpointHandledByAnother(nextBreakpoint)) {
        break;
      }

      myBreakpoints.push(nextBreakpoint);
    }
    return myBreakpoints;
  }

  /**
   * Check if another breakpoint (mostly the next breakpoint) is handled by another binder
   */
  protected breakpointHandledByAnother(name: string) {
    const handledBreakpoints = this.getHandledBreakpoints();
    if (handledBreakpoints.includes(name)) {
      return true;
    }
    return false;
  }

  /**
   * Check if another breakpoint (mostly the previous breakpoint) is handled by no other breakpoint binders.
   * These are all breakpoints that are smaller than the minimum breakpoint.
   * I.e. for these breakpoints there is no binder, neither this one nor another one.
   * @returns
   */
  protected breakpointUnhandled(breakpoint: string) {
    let prevBreakpoint: string | null = breakpoint;

    // Check if all smaller breakpoints are unhandled
    let unhandled = true;
    while (prevBreakpoint && unhandled) {
      if (this.breakpointHandledByAnother(prevBreakpoint)) {
        unhandled = false;
        break;
      }

      prevBreakpoint = this.bs5.getPrevBreakpointByName(prevBreakpoint);

      if (!prevBreakpoint) {
        break;
      }
    }
    return unhandled;
  }

  /**
   * Used to check if there are more binders for other breakpoints
   **/
  protected addToHandledBreakpoints() {
    const handledBreakpoints = this.getHandledBreakpoints();
    handledBreakpoints.push(this.breakpoint);
    this.el.dataset[camelCase(this.attributeName)] =
      jsonStringify(handledBreakpoints);
  }

  /**
   * Get all handled breakpoints.
   * These are the own but also those of other binders.
   * @returns
   */
  protected getHandledBreakpoints() {
    const handledBreakpoints: string[] = parseJsonString(
      this.el.dataset[camelCase(this.attributeName)] || "[]"
    );
    if (!Array.isArray(handledBreakpoints)) {
      throw new Error("breakpoints dataset has unsupported values!");
    }
    return handledBreakpoints;
  }

  bind(el: HTMLElement) {
    this.bs5.on("breakpoint:changed", this.onBreakpointChanges, this);
    if (typeof this.defaultAttributeBinder.bind === "function") {
      this.defaultAttributeBinder.bind(el);
    }
  }

  routine(el: HTMLElement, newValue: any) {
    this.addToHandledBreakpoints();
    this.val = newValue;
    this.setAttributeOnMatch();
  }

  unbind(el: HTMLElement) {
    this.bs5?.off("breakpoint:changed", this.onBreakpointChanges, this);
    if (typeof this.defaultAttributeBinder.unbind === "function") {
      this.defaultAttributeBinder.unbind(el);
    }
  }
}
